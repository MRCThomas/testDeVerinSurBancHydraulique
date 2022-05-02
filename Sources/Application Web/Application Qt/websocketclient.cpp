#include "websocketclient.h"
#include <QtCore/QDebug>

QT_USE_NAMESPACE

//! [constructor]
WebSocketClient::WebSocketClient(const QUrl &url, bool debug, QObject *parent) :
    QObject(parent),
    m_url(url),
    m_debug(debug)
{
    if (m_debug)
        qDebug() << "WebSocket server:" << url;
    connect(&m_webSocket, &QWebSocket::connected, this, &WebSocketClient::onConnected);
    connect(&m_webSocket, &QWebSocket::disconnected, this, &WebSocketClient::closed);
    m_webSocket.open(QUrl(url));
}
//! [constructor]

//! [onConnected]
void WebSocketClient::onConnected()
{
    if (m_debug)
        qDebug() << "WebSocket connected";
    connect(&m_webSocket, &QWebSocket::textMessageReceived,
            this, &WebSocketClient::onTextMessageReceived);
    m_webSocket.sendTextMessage(QStringLiteral("Hello, world!"));
}
//! [onConnected]

//! [onTextMessageReceived]
void WebSocketClient::onTextMessageReceived(QString message)
{
    if (m_debug)
        qDebug() << "Message received:" << message;
    m_webSocket.close();
}
//! [onTextMessageReceived]


