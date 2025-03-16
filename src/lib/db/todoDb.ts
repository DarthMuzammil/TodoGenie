export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
}

class TodoDB {
  private readonly dbName = 'TodoGenieDB';
  private readonly storeName = 'todos';
  private readonly version = 1;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: 'id' });
          // Create indexes for searching
          store.createIndex('title', 'title', { unique: false });
          store.createIndex('completed', 'completed', { unique: false });
          store.createIndex('createdAt', 'createdAt', { unique: false });
        }
      };
    });
  }

  private async getDb(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async addTodo(todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>): Promise<Todo> {
    const db = await this.getDb();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      
      const newTodo: Todo = {
        ...todo,
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        updatedAt: Date.now()
      };

      const request = store.add(newTodo);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(newTodo);
      
      transaction.oncomplete = () => db.close();
    });
  }

  async updateTodo(id: string, updates: Partial<Todo>): Promise<Todo> {
    const db = await this.getDb();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      
      const getRequest = store.get(id);
      
      getRequest.onerror = () => reject(getRequest.error);
      getRequest.onsuccess = () => {
        const existingTodo = getRequest.result;
        if (!existingTodo) {
          reject(new Error('Todo not found'));
          return;
        }

        const updatedTodo: Todo = {
          ...existingTodo,
          ...updates,
          updatedAt: Date.now()
        };

        const updateRequest = store.put(updatedTodo);
        updateRequest.onerror = () => reject(updateRequest.error);
        updateRequest.onsuccess = () => resolve(updatedTodo);
      };
      
      transaction.oncomplete = () => db.close();
    });
  }

  async deleteTodo(id: string): Promise<void> {
    const db = await this.getDb();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      
      const request = store.delete(id);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
      
      transaction.oncomplete = () => db.close();
    });
  }

  async getAllTodos(): Promise<Todo[]> {
    const db = await this.getDb();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
      
      const request = store.getAll();
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      
      transaction.oncomplete = () => db.close();
    });
  }

  async searchTodos(query: string): Promise<Todo[]> {
    const db = await this.getDb();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
      const index = store.index('title');
      
      const request = index.getAll();
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const todos = request.result;
        const searchResults = todos.filter(todo =>
          todo.title.toLowerCase().includes(query.toLowerCase()) ||
          todo.description.toLowerCase().includes(query.toLowerCase())
        );
        resolve(searchResults);
      };
      
      transaction.oncomplete = () => db.close();
    });
  }

  async toggleTodoComplete(id: string): Promise<Todo> {
    const db = await this.getDb();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      
      const getRequest = store.get(id);
      
      getRequest.onerror = () => reject(getRequest.error);
      getRequest.onsuccess = () => {
        const todo = getRequest.result;
        if (!todo) {
          reject(new Error('Todo not found'));
          return;
        }

        const updatedTodo: Todo = {
          ...todo,
          completed: !todo.completed,
          updatedAt: Date.now()
        };

        const updateRequest = store.put(updatedTodo);
        updateRequest.onerror = () => reject(updateRequest.error);
        updateRequest.onsuccess = () => resolve(updatedTodo);
      };
      
      transaction.oncomplete = () => db.close();
    });
  }
}

export const todoDB = new TodoDB(); 