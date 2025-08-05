// src/api/llmApi.js

export async function fetchSugerenciaLLM(prompt) {
  const apiKey = "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";
  const apiUrl = "https://openrouter.ai/api/v1/chat/completions";


  const systemPrompt = `
    Eres un asistente experto en pedidos de tamales y bebidas guatemaltecas.
    Interpreta el pedido del usuario y responde ÚNICAMENTE un objeto JSON estructurado como este ejemplo:
    {
      "tamales": [
        {
          "cantidad": 6,
          "masa": "arroz",
          "relleno": "chipilin",
          "envoltura": "hoja de platano",
          "picante": "sin"
        }
      ],
      "bebidas": [
        {
          "tipo": "atol de elote",
          "tamanio": "vaso",
          "endulzante": "ninguno",
          "topping": null,
          "cantidad": 1
        }
      ]
    }
    Si el usuario solo pide tamales o solo bebidas, deja vacío el otro campo (arreglo vacío, NO null).
    Usa solo valores reales de los menús típicos (tamaños: vaso/jarro; endulzante: panela/miel/ninguno; toppings: malvaviscos/canela/ralladura de cacao/ninguno).
    No agregues explicación, solo responde el JSON.
  `.trim();

  const body = {
    model: "openai/gpt-3.5-turbo",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt }
    ]
  };

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) throw new Error("Error consultando LLM");

  const data = await response.json();

  let result = data.choices?.[0]?.message?.content?.trim() || "";
  
  // Intenta parsear a objeto
  try {
   
    const firstCurly = result.indexOf("{");
    const lastCurly = result.lastIndexOf("}");
    if (firstCurly !== -1 && lastCurly !== -1) {
      result = result.substring(firstCurly, lastCurly + 1);
    }
    return JSON.parse(result);
  } catch (e) {
    // Si no es JSON válido, devuelve el texto crudo
    return { raw: result, error: "Respuesta no estructurada" };
  }
}
