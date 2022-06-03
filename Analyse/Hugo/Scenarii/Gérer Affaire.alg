<?xml version="1.0" encoding="UTF-8"?>
<Algo>
    <description texte="" courant="FIN_ALGORITHME"/>
    <extension extnom="inactif"/>
    <fonction fctetat="inactif" fctcode=""/>
    <F2 F2lignes="" F2para="" F2defaut="" F2etat="inactif"/>
    <repere repcode="-10#10#-10#10#2#2" repetat="inactif"/>
    <param epaisseurPoint="2" maxBoucle="500000" arrondiAuto="vrai" nbDecimales="8" epaisseurLigne="2" totalBoucles="5000000" totalAffichages="1000"/>
    <item algoitem="FONCTIONS_UTILISEES" code="200#declarationfonctions"/>
    <item algoitem="VARIABLES" code="100#declarationsvariables">
        <item algoitem="Affaire EST_DU_TYPE CHAINE" code="1#CHAINE#Affaire"/>
        <item algoitem="Deconnexion EST_DU_TYPE CHAINE" code="1#CHAINE#Deconnexion"/>
    </item>
    <item algoitem="DEBUT_ALGORITHME" code="101#debutalgo">
        <item algoitem="SI (CONNEXION AU POSTE CONTROLEUR REUSSIE) ALORS" code="6#CONNEXION AU POSTE CONTROLEUR REUSSIE">
            <item algoitem="DEBUT_SI" code="7#debutsi"/>
            <item algoitem="TANT_QUE (Deconnexion == NON) FAIRE" code="15#Deconnexion == NON">
                <item algoitem="DEBUT_TANT_QUE" code="16#debuttantque"/>
                <item algoitem="SI (MODIFICATION D'UNE AFFAIRE) ALORS" code="6#MODIFICATION D'UNE AFFAIRE">
                    <item algoitem="DEBUT_SI" code="7#debutsi"/>
                    <item algoitem="Affaire PREND_LA_VALEUR MODIFICATION DE L'AFFAIRE" code="5#Affaire#MODIFICATION DE L'AFFAIRE#pasliste"/>
                    <item algoitem="FIN_SI" code="8#finsi"/>
                </item>
                <item algoitem="SI (SUPPRESSION D'UNE AFFAIRE) ALORS" code="6#SUPPRESSION D'UNE AFFAIRE">
                    <item algoitem="DEBUT_SI" code="7#debutsi"/>
                    <item algoitem="Affaire PREND_LA_VALEUR SUPPRESSION DE L'AFFAIRE" code="5#Affaire#SUPPRESSION DE L'AFFAIRE#pasliste"/>
                    <item algoitem="FIN_SI" code="8#finsi"/>
                </item>
                <item algoitem="SI (DECONNEXION DE L'UTILISATEUR) ALORS" code="6#DECONNEXION DE L'UTILISATEUR">
                    <item algoitem="DEBUT_SI" code="7#debutsi"/>
                    <item algoitem="Deconnexion PREND_LA_VALEUR OUI" code="5#Deconnexion#OUI#pasliste"/>
                    <item algoitem="AFFICHER &quot;Retour à la page d'accueil&quot;" code="4#Retour à la page d'accueil#0"/>
                    <item algoitem="FIN_SI" code="8#finsi"/>
                </item>
                <item algoitem="FIN_TANT_QUE" code="17#fintantque"/>
            </item>
            <item algoitem="FIN_SI" code="8#finsi"/>
        </item>
    </item>
    <item algoitem="FIN_ALGORITHME" code="102#finalgo"/>
</Algo>
