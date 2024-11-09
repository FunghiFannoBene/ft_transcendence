from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    #È come inserire una chiave esterna user_id nella tabella UserProfile per collegarla al modello User
    #OneToOneField: Assicura che ogni UserProfile sia associato esattamente a un singolo User, e viceversa.
    #on_delete=models.CASCADE: Specifica che, se l'utente collegato viene eliminato, anche il profilo associato verrà eliminato automaticamente
    #related_name="profile" definisce un nome che puoi usare per accedere al UserProfile partendo dall’istanza del User collegato.
    #user = User.objects.get(username="example_user") e poi user_profile = user.profile (trovabile dal models di auth)
    avatar = models.ImageField(upload_to="avatar/", null=True, blank=True)
    #gestire base avatar da frontend!  configurata con MEDIA_ROOT. da setting imposta la cartella media
    #configurando Nginx per servire i file nella cartella media/, Django non interviene direttamente nella gestione delle richieste per l'avatar
    #null=True: Questo significa che Django memorizzerà effettivamente NULL nel database
    #blank=True viene considerato anche nei serializer di DRF. Impostando blank=True in un modello, DRF potrebbe trattare il campo come opzionale nei form dei serializer.
    friends = models.ManyToManyField("self", blank=True)
    #add friend
    # user_profile = user.profile
    # friend_profile = friend_user.profile
    # user_profile.friends.add(friend_profile)
    # REMOVE fiend
    # user_profile.friends.remove(friend_profile)
    # LIST friend
    # friends = user_profile.friends.all()
    # .add(obj): Aggiunge un’istanza collegata alla lista.
    # .remove(obj): Rimuove un’istanza collegata dalla lista.
    # .clear(): Rimuove tutte le istanze collegate.
    # .all(): Restituisce tutte le istanze collegate sotto forma di queryset.
    # ManyToManyField è ideale per liste di oggetti che hanno una relazione reciproca o correlata. Per esempio:

    # Amici: dove ogni profilo può avere più amici e ogni amico può a sua volta essere amico di altri.
    # Tag: un articolo può avere molti tag, e ogni tag può essere associato a più articoli.
    # Gruppi di utenti: dove ogni utente può appartenere a più gruppi, e ogni gruppo può avere più utenti.
    online_status = models.BooleanField(default=False)
    #semplice booleano da autogestione
    wins = models.IntegerField(default=0)
    #semplice integer da autogestione
    losses = models.IntegerField(default=0)
    #semplice integer da autogestion
    
    def __str__(self):
        return f"Profilo di {self.user.username}"
    

class MatchHistory(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    players = models.ManyToManyField(User, through='PlayerMatchDetail', related_name='match_histories')
    result = models.CharField(max_length=50, blank=True)
    
    def __str__(self):
        return f'Partita: {self.pk} {self.result}'
    
class PlayerMatchDetail(models.Model):
    player = models.ForeignKey(User, on_delete=models.CASCADE)
    match = models.ForeignKey(MatchHistory, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)
    outcome = models.CharField(max_length=10, choices=[('win', 'Win'), ('loss', 'Loss'), ('draw', 'Draw')])
    #Valore Memorizzato: Django memorizza il valore interno (ad esempio, 'win', 'loss', 'draw') nel database.
    #Etichetta Visualizzata: Quando Django visualizza il campo in un modulo o nell’admin, mostra automaticamente l’etichetta corrispondente (ad esempio, 'Win', 'Loss', 'Draw') al posto del valore memorizzato.
    #outcome_label = player_match_detail.get_outcome_display()
    #Output: "Win"
    
    def __str__(self):
        return f'{self.player.username} - {self.match.date} - {self.outcome}'