import React from 'react'
import builderPalImg from 'styles/img/builderpal/minichatavatar.png'

export default function ChatMessage ({ isUser, message }) {
  return (
    isUser
      ? (
        <div className="chat-widget-speaker right">

            <p className="chat-widget-speaker-message">{message}</p>

        </div>
        )
      : (
        <div className="chat-widget-speaker left">

            <div className="chat-widget-speaker-avatar">

                <div className="user-avatar tiny no-border">

                    <div className="user-avatar-content">

                        <img className="hexagon-image-24-26" src={builderPalImg} />

                    </div>

                </div>

            </div>

            <p className="chat-widget-speaker-message">{message}</p>

        </div>
        )
  )
}
