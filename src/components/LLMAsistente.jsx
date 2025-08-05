import { useState, useRef } from "react";
import { fetchSugerenciaLLM } from "../api/llmApi"; // Ajusta el path si es necesario

function parseSugerenciaToItems(sugerencia) {
  const tamales = Array.isArray(sugerencia.tamales) ? sugerencia.tamales.map(t => ({
    tipo: "tamal",
    cantidad: t.cantidad,
    masa: t.masa,
    relleno: t.relleno,
    envoltura: t.envoltura,
    picante: t.picante,
  })) : [];

  const bebidas = Array.isArray(sugerencia.bebidas) ? sugerencia.bebidas.map(b => ({
    tipo: "bebida",
    tamanio: b.tamanio,
    bebida: b.tipo,
    endulzante: b.endulzante,
    topping: b.topping,
    cantidad: b.cantidad,
  })) : [];

  return [...tamales, ...bebidas];
}

const LLMAsistente = ({ onSugerencia }) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  // Iniciar reconocimiento de voz
  const startRecognition = () => {
    setError(null);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("El reconocimiento de voz no es compatible con este navegador.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "es-ES";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onerror = (event) => {
      setListening(false);
      setError("Error de micrófono: " + event.error);
    };
    recognition.onresult = (event) => {
      setListening(false);
      const transcript = event.results[0][0].transcript;
      setPrompt(transcript);
    };
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    recognition.start();
  };

  // Consultar LLM y agregar al carrito
  const handleEnviar = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchSugerenciaLLM(prompt);
      // Agregar automáticamente al carrito
      const items = parseSugerenciaToItems(res);
      onSugerencia(items);
      setPrompt(""); 
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <div className="bg-orange-50 p-3 rounded mb-2 shadow">
      <div className="flex items-center gap-2 mb-2">
        <textarea
          className="w-full border rounded p-3 text-lg"
          style={{ minHeight: "56px", maxHeight: "90px", resize: "none", fontWeight: "bold" }}
          value={prompt}
          placeholder="Dicta o escribe tu pedido completo..."
          onChange={e => setPrompt(e.target.value)}
          readOnly={listening}
          rows={2}
        />
        <button
          onClick={startRecognition}
          className={`bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full h-12 flex items-center justify-center ${listening ? "animate-pulse" : ""}`}
          title="Dictar por voz"
          type="button"
        >
          {listening ? "🎙️" : "🎤"}
        </button>
      </div>
      <button
        onClick={handleEnviar}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
        disabled={loading || !prompt}
      >
        {loading ? "Consultando LLM..." : "Obtener sugerencia"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default LLMAsistente;
