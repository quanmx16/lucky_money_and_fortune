import { GoogleGenAI, Type } from "@google/genai";
import { PredictionResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeImageForPrediction = async (
  base64Image: string, 
  minAmount: number, 
  maxAmount: number
): Promise<PredictionResult> => {
  // Remove the data URL prefix if present to get just the base64 string
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: 'image/jpeg',
            },
          },
          {
            text: `Đóng vai một thầy bói vui tính, hài hước (hoặc một thầy đồ hiện đại) trong dịp Tết Bính Ngọ năm 2026 (Năm con Ngựa). Hãy xem tướng khuôn mặt người trong ảnh để phán một quẻ đầu năm.

            Hãy sáng tạo ra một "Danh hiệu Tết" thật kêu và lầy lội liên quan đến con người hoặc con ngựa (ví dụ: "Chiến Mã Bất Bại", "Ngựa Chứng Khó Chiều", "Thánh Ăn Chực", "Đại Gia Ngầm").

            Trả về JSON object tiếng Việt gồm:
            - title: Danh hiệu Tết 2026 (Hài hước).
            - description: Phán về vận mệnh năm mới (Tình duyên, tiền bạc, cân nặng) một cách hài hước. Khoảng 2-3 câu ngắn gọn.
            - luckyMoney: Số tiền lì xì "tâm linh" nên nhận được, chọn ngẫu nhiên từ ${minAmount} đến ${maxAmount} (định dạng tiền Việt, vd: "68.000đ").
            - advice: Lời khuyên để sinh tồn qua mấy ngày Tết (vd: cách trốn rửa bát, cách đáp trả khi bị hỏi bao giờ lấy chồng/vợ).
            - strength: Một "siêu năng lực" ngày Tết (vd: Phi nước đại về nhà ăn cơm, Bóc hạt dưa tốc độ ánh sáng).`
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            luckyMoney: { type: Type.STRING },
            advice: { type: Type.STRING },
            strength: { type: Type.STRING },
          },
          required: ["title", "description", "luckyMoney", "advice", "strength"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini");
    }
    return JSON.parse(text) as PredictionResult;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Thầy bói đang đi du xuân, vui lòng thử lại sau!");
  }
};