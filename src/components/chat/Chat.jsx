import React, { useState } from 'react'
import ChatMessage from './ChatMessage'
import { API } from '../../lib/utils';
import Recorder from './Recorder';
import { Button } from "components/ui/button"
import { Input } from "components/ui/input"

export default ({chatId}) => {
    const [chatMessages, setChatMessages] = useState([
        {
            isUser: false,
            message: "Hello! How can I help you in your build today? :)",
            timestamp: new Date(),
        },
        {
            isUser: true,
            message: "Hi! I'm having trouble with my build. It keeps failing.",
            timestamp: new Date(Date.now() - 1000 * 60 * 5),
        },
        {
            isUser: false,
            message: "I'm sorry to hear that. Can you give me more details about the error message?",
            timestamp: new Date(Date.now() - 1000 * 60 * 4),
        },
        {
            isUser: true,
            message: "Sure, it says 'cannot find module xyz'.",
            timestamp: new Date(Date.now() - 1000 * 60 * 3),
        },
        {
            isUser: false,
            message: "Okay, that sounds like a missing dependency. Have you tried running 'npm install'?",
            timestamp: new Date(Date.now() - 1000 * 60 * 2),
        },
        {
            isUser: true,
            message: "Yes, I've tried that but it didn't work.",
            timestamp: new Date(Date.now() - 1000 * 60),
        },
        {
            isUser: false,
            message: "Hmm, let me take a look at your code. Can you share your repository link with me?",
            timestamp: new Date(),
        },
        {
            isUser: true,
            message: "Sure, here it is: https://github.com/myusername/myrepo",
            timestamp: new Date(Date.now() + 1000 * 60),
        },
        {
            isUser: false,
            message: "Thanks, I'll take a look and get back to you soon.",
            timestamp: new Date(Date.now() + 1000 * 60 * 2),
        },
        {
            isUser: false,
            message: "Okay, I found the issue. You're missing a dependency in your package.json file. I'll add it for you now.",
            timestamp: new Date(Date.now() + 1000 * 60 * 3),
        },
    ]);
    const [currMessage, setCurrMessage] = useState("")
    const [isAwaitingResponse, setIsAwaitingResponse] = useState(false)
    const [isRecording, setIsRecording] = useState(false);
    const [recordedBlob, setRecordedBlob] = useState(null);
    const isAudioActive = isRecording || recordedBlob;

    const clusteredChatMessages = chatMessages.reduce((clusters, curr) => {
        const clusterLimitSeconds = 60 * 3
        if (clusters.length == 0 || (clusters[clusters.length - 1].isUser != curr.isUser || curr.timestamp - clusters[clusters.length - 1].timestamp > 1000 * clusterLimitSeconds)) {
            clusters.push({
                isUser: curr.isUser,
                messages: [curr.message],
                timestamp: curr.timestamp,
            })
        } else {
            clusters[clusters.length - 1].messages.push(curr.message)
            clusters[clusters.length - 1].timestamp = curr.timestamp
        }
        return clusters
    }, [])

    function timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    const sendMessage = async () => {
        setIsAwaitingResponse(true)
        let queryResponse = null;
        if (recordedBlob) {
            setCurrMessage("")
            const formData = new FormData();
            formData.append('chat_id', chatId);
            formData.append('audio', recordedBlob);
            setRecordedBlob(null)
            setIsRecording(false)

            queryResponse = await API.chatbotAudioQueryHandler(chatId, formData)
            // queryResponse = {
            //     responseText: "Give me a moment to respond",
            //     emote: "Happy",
            //     is_project_modified: false,
            //     created_at: new Date()
            // }
        } else {
            const query = currMessage
            setCurrMessage("")
            setChatMessages([...chatMessages, {
                isUser: true,
                message: currMessage,
                timestamp: new Date(),
            }])
            // Set to is awaiting
            
            // await timeout(5000)
            // Send currMessage to backend await for response
            queryResponse = await API.chatbotQueryHandler(chatId, {query})

            // const { responseText, emote, is_project_modified, created_at } = await API.chatbotQueryHandler(chatId, {
            //     query: currMessage
            // })
            // queryResponse = {
            //     responseText: "Give me a moment to respond",
            //     emote: "Happy",
            //     is_project_modified: false,
            //     created_at: new Date()
            // }
        }
        // append response to the chatMessage
        setChatMessages((chatMessages) => {
            return [...chatMessages, {
                isUser: false,
                message: queryResponse?.responseText,
                timestamp: new Date(),
            }]
        })
        
        // Set no longer is awaiting
        setIsAwaitingResponse(false)
    }
    return (
        <>
            <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
                <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
                    <div className="relative flex items-center space-x-4">
                        <div className="relative">
                            <span className="absolute text-green-500 right-0 bottom-0">
                                <svg width="20" height="20">
                                    <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                                </svg>
                            </span>
                        </div>
                        <div className="flex flex-col leading-tight">
                            <div className="text-2xl mt-1 flex items-center">
                                <span className="text-gray-700 mr-3">BuilderPal</span>
                            </div>
                            <span className="text-lg text-gray-600">Your friendly pal</span>
                        </div>
                    </div>
    
                </div>
                <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                    {
                        clusteredChatMessages.map((messageCluster) => (
                            <ChatMessage key={messageCluster.id} isUser={messageCluster.isUser} messages={messageCluster.messages}/>
                        ))
                    }
                </div>
                <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                    <div className="flex items-center transition-all duration-500 ease-in-out">
                        {/* Audio Component */}
                        <div className={`flex-shrink-0 ${isAudioActive ? 'flex-grow' : 'w-12'} m-1`}>
                            <Recorder recordedBlob={recordedBlob} setRecordedBlob={setRecordedBlob} setIsRecording={setIsRecording} isRecording={isRecording}/>
                        </div>
                        
                        {/* Input Component */}
                        {!isAudioActive && (
                            <div className="flex-grow p-4">
                                <Input disabled={isAwaitingResponse} value={currMessage} onChange={(e) => {setCurrMessage(e.target.value)}} type="text" placeholder="Write your message!" />
                            </div>
                        )}

                        {/* Button Component */}
                        <button className="flex-shrink-0p-4">
                            <Button disabled={isAwaitingResponse} onClick={sendMessage} type="button" className="items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none disabled:bg-slate-400">
                                <span className="font-bold">Send</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                </svg>
                            </Button>
                        </button>
                    </div>
                </div>

            </div>
        </>
    )
}
