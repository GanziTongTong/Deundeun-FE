import axios from 'axios'

interface DocumentClassificationResponse {
  type: 'invoice' | 'receipt' | 'contract' | 'cv' | 'others'
}

interface OCRResponse {
  text: string
  confidence: number
  [key: string]: unknown
}

export const performOCR = async (imageFile: File): Promise<OCRResponse> => {
  try {
    const formData = new FormData()
    formData.append('document', imageFile)
    formData.append('schema', 'oac')
    formData.append('model', 'ocr')

    const response = await axios.post('https://api.upstage.ai/v1/document-digitization', formData, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_UPSTAGE_API_KEY}`,
        'Content-Type': 'multipart/form-data',
      },
    })

    console.log('📄 OCR API 응답:', response.data)

    return {
      text: response.data.text || '',
      confidence: response.data.confidence || 0,
      ...response.data,
    }
  } catch (error) {
    console.error('OCR failed:', error)
    throw error
  }
}

export const verifyReceiptWithStoreName = (ocrText: string, storeName: string): boolean => {
  if (!ocrText || !storeName) return false

  // 공백 제거 후 비교
  const normalizedOCRText = ocrText.replace(/\s+/g, '').toLowerCase()

  // 가게명의 각 어절이 OCR 텍스트에 포함되어 있는지 확인
  const storeWords = storeName.split(/\s+/).filter((word) => word.length > 0)

  console.log('🔍 영수증 검증:', {
    storeName,
    storeWords,
    ocrTextPreview: ocrText.substring(0, 200),
  })

  // 최소 한 어절이라도 포함되어 있으면 true
  const hasMatch = storeWords.some((word) => {
    const normalizedWord = word.replace(/\s+/g, '').toLowerCase()
    return normalizedOCRText.includes(normalizedWord)
  })

  console.log('✅ 검증 결과:', hasMatch)
  return hasMatch
}

export const classifyDocument = async (imageFile: File): Promise<DocumentClassificationResponse> => {
  try {
    // 파일을 base64로 변환
    const base64Image = await fileToBase64(imageFile)

    const response = await axios.post(
      'https://api.upstage.ai/v1/document-classification/chat/completions',
      {
        model: 'document-classify',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image_url',
                image_url: {
                  url: `data:application/octet-stream;base64,${base64Image}`,
                },
              },
            ],
          },
        ],
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: 'document-classify',
            schema: {
              type: 'string',
              oneOf: [
                { const: 'invoice', description: 'Commercial invoice with itemized charges and billing information' },
                { const: 'receipt', description: 'Receipt showing purchase transaction details' },
                { const: 'contract', description: 'Legal agreement or contract document' },
                { const: 'cv', description: 'Curriculum vitae or resume' },
                { const: 'others', description: 'Other' },
              ],
            },
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_UPSTAGE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    console.log('📄 Document Classification API 응답:', response.data)

    // OpenAI 형식의 응답에서 결과 추출
    const documentType = response.data.choices[0].message.content
    console.log('📋 분류된 문서 타입:', documentType)

    return { type: documentType as DocumentClassificationResponse['type'] }
  } catch (error) {
    console.error('Document classification failed:', error)
    throw error
  }
}

// 파일을 base64로 변환하는 헬퍼 함수
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        // data:image/jpeg;base64, 부분 제거
        const base64 = reader.result.split(',')[1]
        resolve(base64)
      } else {
        reject(new Error('Failed to read file as base64'))
      }
    }
    reader.onerror = (error) => reject(error)
  })
}
