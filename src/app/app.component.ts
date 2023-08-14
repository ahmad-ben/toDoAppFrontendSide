import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>ToDo App</h2>

    <input #addNoteInput type="newNote">
    <button (click)="addNote()">Add Note</button>

    <div class="note" *ngFor="let note of arrayOfNotes">
      <span>{{note.description}}</span>
      <button (click)="deleteNote(note.id)">Delete Note</button>
    </div>
  `,
})

export class AppComponent {
  title = 'frontEnd';
  url = 'https://todoappbackendside.onrender.com/api/toDoApp/';
  arrayOfNotes: any[] = [];

  @ViewChild('addNoteInput') addNoteInput!: ElementRef<HTMLInputElement>;

  http = inject(HttpClient);

  ngOnInit(){ this.getNotes() }

  getNotes(){
    this.clearInputValue();
    this.http.get(`${this.url}getNotes`)
      .subscribe(data => this.arrayOfNotes = data as any[]);
  }

  addNote(){
    const newNoteValue = this.addNoteInput.nativeElement.value;
    const sentData = { newNote: newNoteValue };

    this.http.post(`${this.url}addNote`, sentData)
      .subscribe(data => {
        alert(JSON.stringify(data));
        this.getNotes()
      });
  }

  deleteNote(noteId: string){
    this.http.delete(`${this.url}deleteNote?id=${noteId}`)
      .subscribe(data => {
        alert(JSON.stringify(data));
        this.getNotes()
      });
  }

  clearInputValue(){
    if(this.addNoteInput) this.addNoteInput.nativeElement.value = '';
  }
}
