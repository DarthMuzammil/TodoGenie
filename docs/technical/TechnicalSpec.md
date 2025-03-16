# TodoGenie Technical Specification Document

## System Architecture

### Frontend Architecture
- **Framework**: Next.js with TypeScript
- **State Management**: React Context + Zustand
- **UI Components**: Tailwind CSS + Headless UI
- **Voice Processing**: Eleven Labs Client SDK
- **API Integration**: REST + WebSocket
- **Local Storage**: IndexedDB for offline-first todo management

### IndexedDB Architecture
#### Database Structure
- **Database Name**: TodoGenieDB
- **Version**: 1
- **Object Store**: todos
- **Indexes**:
  - title (non-unique)
  - completed (non-unique)
  - createdAt (non-unique)

#### Todo Schema
```typescript
interface Todo {
  id: string;          // Primary key, UUID
  title: string;       // Todo title
  description: string; // Todo description
  completed: boolean;  // Completion status
  createdAt: number;   // Creation timestamp
  updatedAt: number;   // Last update timestamp
}
```

#### Data Layer Implementation
- **Service Layer**: `TodoDB` class in `src/lib/db/todoDb.ts`
  - Handles all IndexedDB operations
  - Provides CRUD operations
  - Implements search functionality
  - Manages database connections
  - Handles error cases

#### React Integration
- **Custom Hook**: `useTodos` in `src/hooks/useTodos.tsx`
  - Manages todo state
  - Handles loading states
  - Provides error handling
  - Implements search functionality
  - Memoizes operations with useCallback

#### Component Architecture
- **TodoList**: Container component for todo items
  - Handles search input
  - Displays loading states
  - Manages empty states
  - Renders todo items

- **TodoItem**: Presentational component for individual todos
  - Displays todo information
  - Handles completion toggle
  - Manages delete operations
  - Implements optimistic updates

#### Offline Support
- Fully functional offline-first architecture
- Persistent storage across sessions
- No backend synchronization required
- Immediate local updates

#### Performance Considerations
- Efficient indexing for search operations
- Memoized React components
- Optimized database queries
- Connection pooling with db.close()

### Backend Architecture
- **Runtime**: Node.js
- **API Layer**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **File Storage**: AWS S3
- **Caching**: Redis

### Voice Processing Pipeline
1. **Audio Capture**
   - WebRTC for audio streaming
   - Audio preprocessing
   - Noise reduction
   
2. **Speech Processing**
   - Eleven Labs API integration
   - Real-time streaming
   - Text generation
   
3. **Natural Language Processing**
   - Intent recognition
   - Entity extraction
   - Context management

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  voice_profile_id UUID,
  settings JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Tasks Table
```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  title TEXT NOT NULL,
  description TEXT,
  status VARCHAR(50),
  priority INTEGER,
  due_date TIMESTAMP,
  category_id UUID,
  parent_task_id UUID,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Categories Table
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name VARCHAR(255),
  color VARCHAR(50),
  icon VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Voice Profiles Table
```sql
CREATE TABLE voice_profiles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  eleven_labs_voice_id VARCHAR(255),
  settings JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## API Endpoints

### Authentication
- POST /api/auth/signup
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/session

### Tasks
- GET /api/tasks
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id
- GET /api/tasks/categories
- POST /api/tasks/batch

### Voice Integration
- POST /api/voice/process
- POST /api/voice/profile
- GET /api/voice/settings
- PUT /api/voice/settings

## Security Considerations

### Authentication
- JWT-based authentication
- Refresh token rotation
- CSRF protection
- Rate limiting

### Data Protection
- End-to-end encryption for voice data
- Secure storage of API keys
- Data encryption at rest
- Regular security audits

### API Security
- Input validation
- Request sanitization
- Error handling
- Audit logging

## Performance Optimization

### Frontend
- Code splitting
- Lazy loading
- Image optimization
- Service Worker caching

### Backend
- Query optimization
- Connection pooling
- Caching strategy
- Background jobs

### Voice Processing
- Stream processing
- Batch operations
- Compression
- Caching

## Testing Strategy

### Unit Testing
- Component tests
- Service tests
- Utility tests
- Mock integration

### Integration Testing
- API endpoints
- Database operations
- External services
- Authentication flow

### E2E Testing
- User flows
- Voice commands
- Cross-browser testing
- Performance testing

## Deployment Architecture

### Infrastructure
- Vercel (Frontend + API)
- AWS RDS (Database)
- AWS S3 (Storage)
- Redis Labs (Caching)

### CI/CD Pipeline
- GitHub Actions
- Automated testing
- Deployment stages
- Rollback strategy

### Monitoring
- Error tracking
- Performance monitoring
- Usage analytics
- Health checks

## Development Guidelines

### Code Standards
- ESLint configuration
- Prettier setup
- TypeScript strict mode
- Git workflow

### Documentation
- API documentation
- Component documentation
- Setup guides
- Troubleshooting guides

### Best Practices
- Code review process
- Branch strategy
- Commit conventions
- Testing requirements

## Technical Debt Management

### Identified Areas
- Legacy components
- Technical limitations
- Performance bottlenecks
- Security concerns

### Mitigation Strategy
- Regular refactoring
- Dependency updates
- Performance optimization
- Security patches 