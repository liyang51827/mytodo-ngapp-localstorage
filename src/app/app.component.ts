import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgForm } from '@angular/forms';

class Todo {
  title: String = ''
  description: String = ''
  list: [any]
  checked: Boolean = false
  date: number = Date.now()
  important: Boolean = false
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  test: Todo = new Todo()
  newTask: Todo = new Todo()
  dateString: string = ''
  collection: [Todo] = JSON.parse(localStorage.getItem('collection'))
  ngOnInit(){
    this.test.title = 'Test'
  }
  addItem(){
    if (!this.newTask.list) this.newTask.list = ['']
    else this.newTask.list.push('')
  }
  trackByFn(item, id){
    return item
  }
  newTaskFn(){
    if (!this.newTask.title) return alert('Add a title!')
    if (this.dateString) this.newTask.date = new Date(this.dateString).valueOf()
    if (!this.collection) this.collection = [JSON.parse(JSON.stringify(this.newTask))]
    else this.collection.push(JSON.parse(JSON.stringify(this.newTask)))
    this.collection.sort((a, b) => {
      return b.date - a.date
    })
    localStorage.setItem('collection', JSON.stringify(this.collection))
    this.newTask = new Todo()
    this.dateString = ''
  }
  updateCollection(){
    localStorage.setItem('collection', JSON.stringify(this.collection))
  }
  deleteTask(i:number){
    this.collection.splice(i, 1)
    this.updateCollection()
  }
}
