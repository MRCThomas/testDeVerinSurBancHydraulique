#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QWebSocket>
#include <QtSql/QSqlQuery>
#include <QSqlQueryModel>

QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();


private:
    Ui::MainWindow *ui;
    QWebSocket *socket;
    QUrl url;

private Q_SLOTS:
    void onConnected();
    void onTextMessageReceived(QString message);
    void onError(QAbstractSocket::SocketError error);
    void on_pushButton_login_clicked();


public:
    MainWindow (QString, QString, QString, QString);

private:
    void DBConnexion();

    QSqlDatabase DB;
    QString Serveur, Nom, ID, Pass;
};
#endif // MAINWINDOW_H
