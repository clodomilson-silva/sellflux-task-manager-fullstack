const request = require('supertest');
const app = require('../app');

// Mock dos models
jest.mock('../models/tasks.model');
jest.mock('../models/comments.model');

const TaskModel = require('../models/tasks.model');
const CommentModel = require('../models/comments.model');

describe('Task API Tests', () => {

  
  // POST /tasks (sucesso)

  it('should create a task with valid data', (done) => {
    const mockTask = {
      id: '123',
      title: 'Test Task',
      description: 'Test Desc',
      completed: false
    };

    TaskModel.createTask.mockImplementation((title, description, callback) => {
      callback(null, mockTask);
    });

    request(app)
      .post('/tasks')
      .send({ title: 'Test Task', description: 'Test Desc' })
      .expect(201)
      .end((err, res) => {
        expect(res.body).toEqual(mockTask);
        done(err);
      });
  });

 
  // POST /tasks (erro - sem title)

  it('should return 400 when title is missing', (done) => {
    request(app)
      .post('/tasks')
      .send({ description: 'No title' })
      .expect(400)
      .end((err, res) => {
        expect(res.body.error).toBeDefined();
        done(err);
      });
  });

  
  // GET /tasks
  
  it('should return list of tasks', (done) => {
    const mockTasks = [
      { id: '1', title: 'Task 1' },
      { id: '2', title: 'Task 2' }
    ];

    TaskModel.getAllTasks.mockImplementation((callback) => {
      callback(null, mockTasks);
    });

    request(app)
      .get('/tasks')
      .expect(200)
      .end((err, res) => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(2);
        done(err);
      });
  });

  
  // POST /tasks/:id/comments

  it('should create a comment for a task', (done) => {
    const mockComment = {
      id: 'c1',
      task_id: '123',
      content: 'Test comment'
    };

    CommentModel.createComment.mockImplementation((taskId, content, callback) => {
      callback(null, mockComment);
    });

    request(app)
      .post('/tasks/123/comments')
      .send({ content: 'Test comment' })
      .expect(201)
      .end((err, res) => {
        expect(res.body).toEqual(mockComment);
        done(err);
      });
  });

  it('should return 404 when deleting a non-existing task', (done) => {
    TaskModel.deleteTask.mockImplementation((id, callback) => {
      callback(null, false);
    });

    request(app)
      .delete('/tasks/non-existing-id')
      .expect(404)
      .end((err, res) => {
        expect(res.body.error).toBeDefined();
        done(err);
      });
  });

});