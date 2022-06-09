<?xml version="1.0" encoding="UTF-8"?>
<Algo>
    <description courant="Essai PREND_LA_VALEUR ESSAI SUPPRIME" texte=""/>
    <extension extnom="inactif"/>
    <fonction fctcode="" fctetat="inactif"/>
    <F2 F2etat="inactif" F2defaut="" F2para="" F2lignes=""/>
    <repere repetat="inactif" repcode="-10#10#-10#10#2#2"/>
    <param arrondiAuto="vrai" maxBoucle="500000" epaisseurLigne="2" totalAffichages="1000" epaisseurPoint="2" totalBoucles="5000000" nbDecimales="8"/>
    <item code="200#declarationfonctions" algoitem="FONCTIONS_UTILISEES"/>
    <item code="100#declarationsvariables" algoitem="VARIABLES">
        <item code="1#CHAINE#Deconnexion" algoitem="Deconnexion EST_DU_TYPE CHAINE"/>
        <item code="1#CHAINE#Essai" algoitem="Essai EST_DU_TYPE CHAINE"/>
    </item>
    <item code="101#debutalgo" algoitem="DEBUT_ALGORITHME">
        <item code="6#CONNEXION AU POSTE CONTROLEUR REUSSIE" algoitem="SI (CONNEXION AU POSTE CONTROLEUR REUSSIE) ALORS">
            <item code="7#debutsi" algoitem="DEBUT_SI"/>
            <item code="15#Deconnexion == NON" algoitem="TANT_QUE (Deconnexion == NON) FAIRE">
                <item code="16#debuttantque" algoitem="DEBUT_TANT_QUE"/>
                <item code="6#MODIFICATION D'UN ESSAI" algoitem="SI (MODIFICATION D'UN ESSAI) ALORS">
                    <item code="7#debutsi" algoitem="DEBUT_SI"/>
                    <item code="5#Essai#ESSAI MODIFIE#pasliste" algoitem="Essai PREND_LA_VALEUR ESSAI MODIFIE"/>
                    <item code="8#finsi" algoitem="FIN_SI"/>
                </item>
                <item code="6#SUPPRESSION D'UN ESSAI" algoitem="SI (SUPPRESSION D'UN ESSAI) ALORS">
                    <item code="7#debutsi" algoitem="DEBUT_SI"/>
                    <item code="5#Essai#ESSAI SUPPRIME#pasliste" algoitem="Essai PREND_LA_VALEUR ESSAI SUPPRIME"/>
                    <item code="8#finsi" algoitem="FIN_SI"/>
                </item>
                <item code="6#DECONNEXION DE L'UTILISATEUR" algoitem="SI (DECONNEXION DE L'UTILISATEUR) ALORS">
                    <item code="7#debutsi" algoitem="DEBUT_SI"/>
                    <item code="5#Deconnexion#OUI#pasliste" algoitem="Deconnexion PREND_LA_VALEUR OUI"/>
                    <item code="4#Retour à la page d'accueil#0" algoitem="AFFICHER &quot;Retour à la page d'accueil&quot;"/>
                    <item code="8#finsi" algoitem="FIN_SI"/>
                </item>
                <item code="17#fintantque" algoitem="FIN_TANT_QUE"/>
            </item>
            <item code="8#finsi" algoitem="FIN_SI"/>
        </item>
    </item>
    <item code="102#finalgo" algoitem="FIN_ALGORITHME"/>
</Algo>
