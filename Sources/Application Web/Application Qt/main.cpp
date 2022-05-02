#include "InitiationQt.h"
#include <QApplication>
#include <QLocale>
#include <QTranslator>
//#include "websocketclient.h"

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);

    QTranslator translator;
    const QStringList uiLanguages = QLocale::system().uiLanguages();
    for (const QString &locale : uiLanguages) {
        const QString baseName = "AppVerin_" + QLocale(locale).name();
        if (translator.load(":/i18n/" + baseName)) {
            a.installTranslator(&translator);
            break;
        }
    }

    //WebSocketClient client(QUrl(QStringLiteral("ws://localhost:3000/ws")), true);
    //QObject::connect(&client, &WebSocketClient::closed, &a, &QCoreApplication::quit);

    InitiationQt w;
    w.show();
    return a.exec();
}
