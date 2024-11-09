from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, MatchHistory, PlayerMatchDetail

# `ModelSerializer` crea automaticamente un serializer basato su un modello Django, con i campi e la validazione derivati direttamente dal modello stesso.
# Si usa quando desideriamo convertire un modello Django in JSON e viceversa, sfruttando l'integrazione con i modelli esistenti per generare campi e convalida.
class UserProfileSerializer(serializers.ModelSerializer):
    # `StringRelatedField` è usato per rappresentare un campo relazionale come stringa, basandosi sul metodo `__str__` dell'oggetto collegato.
    # Utile quando non si ha bisogno di serializzare l'intero oggetto correlato, ma solo una sua rappresentazione leggibile (ad esempio, il `username`).
    user = serializers.StringRelatedField()  # Converte il campo `user` in una stringa rappresentativa (es: nome utente)

    # `PrimaryKeyRelatedField` rappresenta relazioni tramite la chiave primaria degli oggetti collegati.
    # `many=True` indica che è una relazione a più oggetti (lista), ad esempio un utente con molti amici.
    # `read_only=True` significa che il campo è di sola lettura e non può essere modificato dal client.
    friends = serializers.PrimaryKeyRelatedField(many=True, read_only=True)  # Lista degli ID degli amici dell'utente

    class Meta:
        # Associa il serializer al modello `UserProfile` e specifica i campi da includere nel JSON.
        model = UserProfile
        # `fields` elenca i campi del modello che saranno convertiti in JSON.
        # Questo permette un controllo preciso su quali dati esporre nell'API.
        fields = ['user', 'avatar', 'friends', 'online_status', 'wins', 'losses']
        

# Serializer per i dettagli di ogni giocatore in una partita.
class PlayerMatchDetailSerializer(serializers.ModelSerializer):
    # `StringRelatedField` qui mostra il giocatore e il match come stringhe leggibili anziché serializzare l'intero oggetto.
    player = serializers.StringRelatedField()  # Mostra il nome del giocatore come stringa
    match = serializers.StringRelatedField()   # Mostra il nome del match come stringa

    # `source='get_outcome_display'` specifica che il campo `outcome_display` utilizza il metodo `get_outcome_display`
    # per convertire il valore di `outcome` (che può essere un codice interno) in una rappresentazione leggibile.
    # `read_only=True` rende il campo solo per visualizzazione.
    outcome_display = serializers.CharField(source='get_outcome_display', read_only=True)  # Converte outcome in stringa leggibile
    
    class Meta:
        model = PlayerMatchDetail
        # Specifica i campi serializzati, includendo outcome e score. `outcome_display` fornisce una versione leggibile dell'outcome.
        fields = ['player', 'match', 'score', 'outcome', 'outcome_display']
        

# Serializer per la cronologia delle partite (MatchHistory), con dettagli di giocatori e risultati.
class MatchHistorySerializer(serializers.ModelSerializer):
    # `UserProfileSerializer` è nidificato qui per rappresentare i dati dei giocatori nel formato JSON dettagliato.
    # `many=True` perché ogni match coinvolge più giocatori, quindi `players` sarà una lista di oggetti `UserProfile`.
    # `read_only=True` indica che i dati dei giocatori sono solo visualizzabili e non modificabili tramite questa serializzazione.

    # Usa `PlayerMatchDetailSerializer` per serializzare dettagli del match per ogni giocatore.
    # `source='playermatchdetail_set'` specifica che questo campo è popolato da una relazione inversa (many-to-one) con `PlayerMatchDetail`.
    # `many=True` perché ci sono più dettagli di giocatori in un singolo match, e `read_only=True` ne impedisce la modifica.
    details = PlayerMatchDetailSerializer(source='playermatchdetail_set', many=True, read_only=True)  # Lista dettagli per ogni giocatore nel match
    players = UserProfileSerializer(many=True, read_only=True)  # Lista di profili dei giocatori nel match
    
    class Meta:
        model = MatchHistory
        # Specifica i campi per il JSON del match, inclusi la data, i giocatori coinvolti, il risultato e i dettagli del match.
        fields = ['date', 'players', 'result', 'details']
