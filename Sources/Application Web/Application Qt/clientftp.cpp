#include "clientftp.h"

ClientFtp::ClientFtp()
{
    drapeau=0; // initialisation du drapeau
}

ClientFtp::ClientFtp(QObject *parent)
    : QObject{parent}
{

    void ClientFtp ::se_connecter(QString IP,QString log,QString pass)
    {
        // pour détecter la connexion au serveur
        QObject::connect(&f,SIGNAL(stateChanged(int)),this,SLOT(fait(int)));
        // pour détecter la fin de transfert
        QObject::connect(&f,SIGNAL(commandFinished(int,bool)),
        this,SLOT(transfertOK(int,bool)));
        // pour connaître la progression du transfert (vers une QProgressBar)
        QObject::connect(&f,SIGNAL(dataTransferProgress(qint64,qint64)),
        this,SIGNAL(progress_vers_IHM( qint64,qint64)));
        f.connectToHost(IP);
        f.login(log,pass);
    }
    void ClientFtp ::get_fichier(QString phrase)
    {
        fichier.setFileName (phrase);       // on garde le même nom de fichier sur le disque dur
        fichier.open(QIODevice::WriteOnly); // ouverture en écriture
        f.get(phrase,&fichier);             // on commence le transfert FTP
        drapeau=1;                          // mémorisation de début de transfert
    }
    void ClientFtp ::transfertOK()
    {
        if (drapeau==1) // si on a commencé le transfert
        {
            fichier.close();   // on ferme le fichier
            f.close();         // on ferme la connexion FTP
            drapeau=0;         // on réinitialise le drapeau à 0
        }
    }
    // à chaque changement d'état de la connexion
    void ClientFtp ::fait (int v)
    {
        if (v==4) // si on a réussi à se logguer
            emit connexion_ok(); // envoi d'un signal vers l'IHM
    }
}

