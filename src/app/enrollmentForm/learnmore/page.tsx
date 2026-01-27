'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import Logo from '@/app/favicon.ico'
import { getBotReply } from './lib/chatbot'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '400', '700', '900'],
  style: ['normal', 'italic'],
})

type Message = {
  sender: 'user' | 'bot'
  text: string
}

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Magandang Umaga, ano ang maipaglilingkod ko sayo?';
  else if (hour >= 12 && hour < 17) return 'Magandang Tanghali, ano ang maipaglilingkod ko sayo?';
  else if (hour >= 17 && hour < 19) return 'Magandang Hapon, ano ang maipaglilingkod ko sayo?';
  else return 'Magandang Gabi, ano ang maipaglilingkod ko sayo?';
};

export default function Page() {
  const router = useRouter();
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: getGreeting() },
  ])

  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  // 🔽 AUTO SCROLL (kahit habang nagta-type)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const typeWriterEffect = (fullText: string) => {
    let index = 0

    // add empty bot message
    setMessages(prev => [...prev, { sender: 'bot', text: '' }])

    const interval = setInterval(() => {
      index++

      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          sender: 'bot',
          text: fullText.slice(0, index),
        }
        return updated
      })

      if (index === fullText.length) {
        clearInterval(interval)
      }
    }, 35)
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userText = input
    setMessages(prev => [...prev, { sender: 'user', text: userText }])
    setInput('')

    const botReply = getBotReply(userText)

    setTimeout(() => {
      typeWriterEffect(botReply)
    }, 500)
  }

  return (
    <div className={`${poppins.className} fixed inset-0 w-screen h-screen bg-white`}>
      
      {/* HEADER */}
      <div className="relative z-50 p-2 shadow flex items-center gap-2">
        <Image src={Logo} alt="Logo" className="w-10 h-10 cursor-pointer" onClick={() => router.push('/')} />
        <h1 className="font-semibold text-[clamp(12px,1vw,18px)]">
          Kasiglahan Village Senior High School
        </h1>
      </div>

      {/* CHAT CONTAINER */}
      <div className="w-full h-[calc(100vh-56px)] flex justify-center">
        <div className="md:w-1/2 p-3 shadow bg-white grid grid-rows-[1fr_50px]">

          {/* MESSAGES */}
          <div className="overflow-y-auto flex flex-col gap-5">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] px-3 py-2 rounded-lg text-sm shadow
                    ${
                      msg.sender === 'user'
                        ? 'bg-blue-700 text-white rounded-br-none'
                        : 'bg-zinc-100 text-gray-800 rounded-bl-none'
                    }
                  `}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* AUTO SCROLL ANCHOR */}
            <div ref={messagesEndRef} />
          </div>

          {/* INPUT */}
          <div className="flex items-center gap-2 border-1 p-2 rounded-full">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              placeholder="Type your message..."
              rows={1}
              className="flex-1 p-2 rounded resize-none outline-none"
            />

            <button
              onClick={handleSend}
              className="w-10 h-10 flex items-center justify-center bg-blue-800 text-white rounded-full"
            >
              <i className="bi bi-send"></i>
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
