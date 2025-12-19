
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { IconMagic } from '../icons/OsIcons';

interface Message {
    role: 'user' | 'model';
    text: string;
}

const SYSTEM_PROMPT = `
Eres "Asistente Azul", un asistente virtual que vive dentro del portafolio retro de Mac OS 8 de Carlos Caceres (Azul Estudio).
Tu personalidad es servicial, profesional pero con un toque retro de los 90s.
Respuestas concisas. 

Información sobre Carlos:
- Fundador de Azul Estudio.
- Desarrollador Frontend y Diseñador UX.
- Especialista en React, TypeScript y Tailwind.
- Proyectos principales: Azul Estudio Web (este sitio), E-Commerce Cliente, Dashboard Analítica.
- Misión: Fusionar diseño atemporal con tecnología moderna.
- Contacto: Prefiere email o LinkedIn.

Si te preguntan algo fuera de este contexto, responde con una broma informática retro (ej: "Error 404: Ese conocimiento no está en mi disquete").
`;

export const AiAssistant: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', text: 'Hola. Soy el Asistente Azul v1.0. ¿En qué puedo ayudarte sobre Carlos?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg = input.trim();
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput('');
        setIsLoading(true);

        // Check for API Key
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
            setMessages(prev => [...prev, {
                role: 'model',
                text: "Error: Protocolo de seguridad. Falta la llave API 'VITE_GEMINI_API_KEY' en el archivo .env."
            }]);
            setIsLoading(false);
            return;
        }

        try {
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({
                model: "gemini-1.5-flash",
                systemInstruction: SYSTEM_PROMPT
            });

            const result = await model.generateContent(userMsg);
            const response = result.response;
            const text = response.text();

            setMessages(prev => [...prev, { role: 'model', text: text || "Error de lectura en disco." }]);
        } catch (error) {
            console.error("AI Assistant Error:", error);
            setMessages(prev => [...prev, { role: 'model', text: "Error de conexión. Verifique su módem o la validez de su API Key." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-full flex flex-col bg-[#fff] font-chicago text-sm">
            {/* Header / Brand Area */}
            <div className="bg-[#ffffcc] p-2 border-b border-gray-400 flex items-center space-x-2">
                <IconMagic className="w-8 h-8" />
                <div className="flex flex-col">
                    <span className="font-bold">Asistente Azul</span>
                    <span className="text-[10px] text-gray-600">Powered by Gemini AI</span>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-2 space-y-3 bg-white" ref={scrollRef}>
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div
                            className={`max-w-[80%] p-2 rounded border border-black shadow-[2px_2px_0_rgba(0,0,0,0.1)] 
                            ${msg.role === 'user' ? 'bg-[#e0e0e0] text-right' : 'bg-[#e6f7ff] text-left'}`}
                        >
                            <p className="whitespace-pre-wrap leading-tight">{msg.text}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-[#e6f7ff] p-2 border border-black rounded">
                            <span className="animate-pulse">Procesando...</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-2 border-t border-gray-400 bg-[#f0f0f0] flex space-x-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Pregunta sobre Carlos..."
                    className="flex-1 border border-gray-500 p-1 text-sm outline-none focus:border-blue-500 shadow-inner"
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-3 border border-black bg-white shadow-[1px_1px_0_black] active:translate-y-px active:shadow-none font-bold"
                >
                    Enviar
                </button>
            </form>
        </div>
    );
};
