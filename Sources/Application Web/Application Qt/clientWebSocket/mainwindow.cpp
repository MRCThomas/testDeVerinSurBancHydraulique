#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QtCore/QDebug>
#include <QDesktopServices>
#include <QtSql/QSqlQuery>
#include <QMessageBox>
#include <QtSql/QSqlDatabase>
#include <QSqlQueryModel>
#include <QAuthenticator>
#include <QSqlError>

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    ui->lineEdit_password->setEchoMode(QLineEdit::Password);
    socket = new QWebSocket();
    QObject::connect(socket, &QWebSocket::connected, this, &MainWindow::onConnected);
    //QObject::connect(socket, &QWebSocket::error, this, &MainWindow::onError);
    socket->open(*(new QUrl(QStringLiteral("ws://192.168.65.187:3000"))));
    //QDesktopServices::openUrl(QUrl("http://192.168.65.187:3000",QUrl::TolerantMode));

}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::onConnected(){
    qDebug() << "Socket connected";
    connect(socket, &QWebSocket::connected, this, &MainWindow::onConnected);
    socket->sendTextMessage(QStringLiteral("Salut Serveur ! "));
}

void MainWindow::onError(QAbstractSocket::SocketError error){
    qDebug() << "No message";
    qDebug() << error;
}

void MainWindow::onTextMessageReceived(QString message){
    qDebug() << "Message received";
    qDebug() << message;
}

MainWindow::MainWindow(QString, QString, QString, QString)
{
    DB = QSqlDatabase::addDatabase("QMYSQL");
        DB.setHostName("192.168.65.187");
        DB.setPort(3306);
        DB.setDatabaseName("testverins");
        DB.setUserName("root");
        DB.setPassword("root");

    DB.open();

    qDebug() << DB.connectionName();
    qDebug() << DB.isOpen();
    qDebug() << DB.contains();

    DBConnexion();        // Appelle de la fonction faite pour vérifier la connection a la Base de donnée au lancement du programme
}

void MainWindow::DBConnexion()
{
    if(!DB.isOpen())           // Si l'ouverture as eu un problème ou non, afficher le message correspondant
    {
        QMessageBox::warning(this, "Erreur Ouverture", DB.lastError().text());
    }
    else
    {
        QMessageBox::information(this, "Bonne Ouverture", "Connexion BD Ok!");
    }
}

void MainWindow::on_pushButton_login_clicked()
{

    QString enteredUsername = ui->lineEdit_username->text();
    QString enteredPassword = ui->lineEdit_password->text();
    QString username;
    QString password;


    QSqlQuery query;
    QString request = "SELECT Identifiants, MDP FROM users WHERE Identifiants='" + enteredUsername + "' LIMIT 1;";
    query.exec(request);

    while(query.next())
    {
        username = query.value(0).toString();
        password = query.value(1).toString();
        break;
    }


    if (!username.compare(enteredUsername) && (!password.compare(enteredPassword)))
        QMessageBox::information(this,"Success", "Login information is correct");
    else
        QMessageBox::information(this,"FAIL", "Incorrect login");

}

