<?xml version="1.0" encoding="UTF-8"?>
<Algo>
    <description courant="AFFICHER &quot;L'utilisateur est connecte&quot;" texte=""/>
    <extension extnom="inactif"/>
    <fonction fctcode="" fctetat="inactif"/>
    <F2 F2etat="inactif" F2defaut="" F2para="" F2lignes=""/>
    <repere repetat="inactif" repcode="-10#10#-10#10#2#2"/>
    <param arrondiAuto="vrai" maxBoucle="500000" epaisseurLigne="2" totalAffichages="1000" epaisseurPoint="2" totalBoucles="5000000" nbDecimales="8"/>
    <item code="200#declarationfonctions" algoitem="FONCTIONS_UTILISEES"/>
    <item code="100#declarationsvariables" algoitem="VARIABLES">
        <item code="1#CHAINE#Utilisateur" algoitem="Utilisateur EST_DU_TYPE CHAINE"/>
        <item code="1#CHAINE#Nom_dUtilisateur" algoitem="Nom_dUtilisateur EST_DU_TYPE CHAINE"/>
        <item code="1#CHAINE#Connexion" algoitem="Connexion EST_DU_TYPE CHAINE"/>
    </item>
    <item code="101#debutalgo" algoitem="DEBUT_ALGORITHME">
        <item code="15#Connexion = REFUSEE" algoitem="TANT_QUE (Connexion = REFUSEE) FAIRE">
            <item code="16#debuttantque" algoitem="DEBUT_TANT_QUE"/>
            <item code="4#Utilisateur saisie le nom d'utilisateur#0" algoitem="AFFICHER &quot;Utilisateur saisie le nom d'utilisateur&quot;"/>
            <item code="4#Utilisateur saisie le mot de passe#0" algoitem="AFFICHER &quot;Utilisateur saisie le mot de passe&quot;"/>
            <item code="6#Nom_dUtilisateur == VALIDE" algoitem="SI (Nom_dUtilisateur == VALIDE) ALORS">
                <item code="7#debutsi" algoitem="DEBUT_SI"/>
                <item code="6#Mot de passe == VALIDE" algoitem="SI (Mot de passe == VALIDE) ALORS">
                    <item code="7#debutsi" algoitem="DEBUT_SI"/>
                    <item code="5#Connexion#ACCEPTEE#pasliste" algoitem="Connexion PREND_LA_VALEUR ACCEPTEE"/>
                    <item code="8#finsi" algoitem="FIN_SI"/>
                </item>
                <item code="8#finsi" algoitem="FIN_SI"/>
            </item>
            <item code="17#fintantque" algoitem="FIN_TANT_QUE"/>
        </item>
        <item code="4#L'utilisateur est connecte#0" algoitem="AFFICHER &quot;L'utilisateur est connecte&quot;"/>
    </item>
    <item code="102#finalgo" algoitem="FIN_ALGORITHME"/>
</Algo>
