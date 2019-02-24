import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  url = 'http://localhost:4000';

  constructor( private http: HttpClient) { }

  getIssues() {
    return this.http.get(`${this.url}/issues`);
  }

  getIssueById(id) {
    return this.http.get(`${this.url}/issues/${id}`);
  }

  addIssue(title, responsible, description, severity) {
    const issue = {
      title,
      responsible,
      severity,
      description
    };
    return this.http.post(`${this.url}/issues/add`, issue);
  }

  updateIssue(id, title, responsible, description, severity, status) {
    const issue = {
      title,
      responsible,
      description,
      severity,
      status
    };
    return this.http.put(`${this.url}/issues/update/${id}`, issue);
  }

  deleteIssue(id) {
    return this.http.delete(`${this.url}/issues/delete/${id}`);
  }
}
