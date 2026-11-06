package biblio.model;

import java.time.LocalDate;

import org.hibernate.annotations.Check;
import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table
@Check (constraints = "note BETWEEN 0 AND 10")
public class Avis {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(nullable = false) // columnDefinition = "INT CHECK (note <= 10 AND note >= 0)"
    private int note;
    
    @Column(length = 2000)
    private String commentaire;
    
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(nullable = false)
    private LocalDate date;
    
    @ManyToOne
    @JoinColumn (nullable = false)
    private Livre livre;
    
    public Avis() {}
    
    public Avis(Integer id, int note, String commentaire, LocalDate date, Livre livre) {
        this.id = id;
        this.note = note;
        this.commentaire = commentaire;
        this.date = date;
        this.livre = livre;
    }

    public int getNote() {
        return note;
    }
    
    public void setNote(int note) {
        this.note = note;
    }
    
    public String getCommentaire() {
        return commentaire;
    }
    
    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }
    
    public LocalDate getDate() {
        return date;
    }
    
    public void setDate(LocalDate date) {
        this.date = date;
    }
    
    public Livre getLivre() {
        return livre;
    }
    
    public void setLivre(Livre livre) {
        this.livre = livre;
    }
    
    public Integer getId() {
        return id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    
    public String toString() {
        return "Avis [id=" + id + ", note=" + note + ", commentaire=" + commentaire + ", date=" + date + ", livre="
        + livre + "]";
    }
    
    
}
