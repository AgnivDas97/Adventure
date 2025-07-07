import React from 'react'
import "../style/NotificationPage.css"

const NotificationPage = () => {
    return (
        <div>
            <main class="notifications">
                <div class="notification">
                    <div class="info">
                        <div class="avatar"></div>
                        <span><strong>Agniv Das</strong> upload a status.</span>
                    </div>
                    <span class="time">23hr</span>
                </div>
                <div class="notification highlight">
                    <div class="info">
                        <div class="avatar"></div>
                        <span><strong>Agniv Das</strong> liked on your post.</span>
                    </div>
                    <span class="time">23hr</span>
                </div>
                <div class="see-all">See All</div>
            </main>

        </div>
    )
}

export default NotificationPage
