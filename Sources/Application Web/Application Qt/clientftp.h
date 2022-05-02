#ifndef CLIENTFTP_H
#define CLIENTFTP_H

#include <QObject>

class ClientFtp : public QObject
{
Q_OBJECT
public :
    ClientFtp() ;
public slots :
    void se_connecter(QString IP,QString log,QString pass);
    void get_fichier(QString phrase);
private slots :
    void transfertOK(int,bool);
    void fait (int v) ;
signals :
    void connexion_ok();
    void progress_vers_IHM( qint64,qint64 );
private :
    QFtp f;
    QFile fichier;
    int drapeau;
};

#endif // CLIENTFTP_H
