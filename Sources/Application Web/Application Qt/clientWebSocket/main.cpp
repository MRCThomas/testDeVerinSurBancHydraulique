#include "mainwindow.h"

#include <QApplication>

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);

    QString Serveur = "ws://192.168.65.187:3000";
        QString Nom = "testverins";
        QString ID = "";
        QString Pass = "";
        MainWindow DB(Serveur, Nom, ID, Pass);

    MainWindow w;
    w.show();
    return a.exec();
}
