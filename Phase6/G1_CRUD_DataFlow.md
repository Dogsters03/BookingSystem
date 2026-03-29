# G1: CRUD Data Flow - Booking System Phase6

This document models the Complete CRUD (Create, Read, Update, Delete) operations for the Booking System Phase6. Each section contains a Mermaid sequence diagram showing the actual data flow observed in the codebase.

---

## 1. CREATE (C) - POST /api/resources

**Endpoint:** `POST /api/resources`

**Request Headers:** `Content-Type: application/json`

**Payload Format:**
```json
{
  "resourceName": "Meeting Room A",
  "resourceDescription": "Large conference room with 20 seats",
  "resourceAvailable": true,
  "resourcePrice": 50,
  "resourcePriceUnit": "hour"
}
```

**Mermaid Sequence Diagram:**

```mermaid
sequenceDiagram
    participant User as User (Browser)
    participant Frontend as Frontend<br/>(form.js, resources.js)
    participant Backend as Backend<br/>(Express Router)
    participant Validator as Validator Layer<br/>(resourceValidators)
    participant Service as Service Layer<br/>(log.service.js)
    participant DB as PostgreSQL

    User->>Frontend: Click "Create" button (form filled)
    Frontend->>Frontend: getPayloadFromForm()
    Frontend->>Backend: POST /api/resources<br/>{resourceName, resourceDescription, resourceAvailable, resourcePrice, resourcePriceUnit}

    alt Validation Success
        Backend->>Validator: resourceValidators middleware
        Validator->>Validator: Check field constraints<br/>(length, format, etc.)
        Validator->>Backend: ✓ Validation passes
        
        Backend->>DB: INSERT INTO resources<br/>VALUES ($1, $2, $3, $4, $5)<br/>RETURNING *
        
        alt Insert Success (no duplicate)
            DB->>Backend: ✓ rowCount=1, rows=[{id, name, description, available, price, price_unit, created_at}]
            Backend->>Service: logEvent({message: "Resource created (ID X)", entityId: X})
            Service->>DB: INSERT INTO logs
            DB->>Service: ✓ Logged
            Backend->>Frontend: ✓ 201 Created<br/>{ok: true, data: {...}}
            Frontend->>User: ✓ Success Message<br/>"Resource created!"<br/>Clear form, reload list
        else Insert Fails (Duplicate Name - Code 23505)
            DB->>Backend: ✗ Error code 23505 (unique constraint)
            Backend->>Service: logEvent({message: "Duplicate resource blocked", entityId: null})
            Service->>DB: INSERT INTO logs
            DB->>Service: ✓ Logged
            Backend->>Frontend: ✗ 409 Conflict<br/>{ok: false, error: "Duplicate resource name"}
            Frontend->>User: ✗ Error Message<br/>"Duplicate name already exists"
        end
    else Validation Fails
        Backend->>Validator: resourceValidators middleware
        Validator->>Validator: Check field constraints
        Validator->>Backend: ✗ Validation fails
        Backend->>Frontend: ✗ 400 Bad Request<br/>{ok: false, errors: [{field: "...", msg: "..."}]}
        Frontend->>User: ✗ Error Message<br/>Display field errors
    else Database Error
        Backend->>DB: INSERT INTO resources
        DB->>Backend: ✗ Unexpected database error
        Backend->>Frontend: ✗ 500 Server Error<br/>{ok: false, error: "Database error"}
        Frontend->>User: ✗ Generic Error Message
    end
```

---

## 2. READ (R) - GET /api/resources (Fetch All)

**Endpoint:** `GET /api/resources`

**Query Parameters:** None

**Response Format:**
```json
{
  "ok": true,
  "data": [
    {
      "id": 1,
      "name": "Meeting Room A",
      "description": "Large conference room",
      "available": true,
      "price": 50,
      "price_unit": "hour",
      "created_at": "2025-01-15T10:30:00.000Z"
    },
    ...
  ]
}
```

**Mermaid Sequence Diagram:**

```mermaid
sequenceDiagram
    participant User as User (Browser)
    participant Frontend as Frontend<br/>(resources.js)
    participant Backend as Backend<br/>(Express Router)
    participant DB as PostgreSQL

    Frontend->>Frontend: loadResources() on page load
    Frontend->>Backend: GET /api/resources

    alt Read Success
        Backend->>DB: SELECT * FROM resources<br/>ORDER BY created_at DESC
        DB->>Backend: ✓ rowCount=N, rows=[{...}, {...}]
        Backend->>Frontend: ✓ 200 OK<br/>{ok: true, data: [...]}
        Frontend->>Frontend: resourcesCache = rows
        Frontend->>Frontend: renderResourceList(resourcesCache)
        Frontend->>User: ✓ Display all resources<br/>in clickable list
    else Database Error
        Backend->>DB: SELECT * FROM resources
        DB->>Backend: ✗ Database connection error
        Backend->>Frontend: ✗ 500 Server Error<br/>{ok: false, error: "Database error"}
        Frontend->>User: ✗ Empty list displayed<br/>Console shows error
    end
```

---

## 3. READ (R) - GET /api/resources/:id (Fetch One)

**Endpoint:** `GET /api/resources/:id`

**URL Parameters:** `id` (numeric resource ID)

**Response Format:**
```json
{
  "ok": true,
  "data": {
    "id": 1,
    "name": "Meeting Room A",
    "description": "Large conference room",
    "available": true,
    "price": 50,
    "price_unit": "hour",
    "created_at": "2025-01-15T10:30:00.000Z"
  }
}
```

**Mermaid Sequence Diagram:**

```mermaid
sequenceDiagram
    participant User as User (Browser)
    participant Frontend as Frontend<br/>(resources.js)
    participant Backend as Backend<br/>(Express Router)
    participant DB as PostgreSQL

    User->>Frontend: Click on a resource in list
    Frontend->>Backend: GET /api/resources/:id

    alt ID Validation Fails
        Backend->>Backend: isNaN(id) check
        Backend->>Frontend: ✗ 400 Bad Request<br/>{ok: false, error: "Invalid ID"}
        Frontend->>User: ✗ Error (console logged)
    else ID Validation Success
        Backend->>DB: SELECT * FROM resources WHERE id = $1
        
        alt Resource Found (rowCount=1)
            DB->>Backend: ✓ rows=[{...}]
            Backend->>Frontend: ✓ 200 OK<br/>{ok: true, data: {...}}
            Frontend->>Frontend: selectResource(resource)<br/>Load form fields with data
            Frontend->>User: ✓ Form populated<br/>Switch to "edit" mode
        else Resource Not Found (rowCount=0)
            DB->>Backend: ✓ rows=[]
            Backend->>Frontend: ✗ 404 Not Found<br/>{ok: false, error: "Resource not found"}
            Frontend->>User: ✗ Error: "Resource not found"
        end
    else Database Error
        Backend->>DB: SELECT * FROM resources WHERE id = $1
        DB->>Backend: ✗ Database error
        Backend->>Frontend: ✗ 500 Server Error<br/>{ok: false, error: "Database error"}
        Frontend->>User: ✗ Generic error message
    end
```

---

## 4. UPDATE (U) - PUT /api/resources/:id

**Endpoint:** `PUT /api/resources/:id`

**URL Parameters:** `id` (numeric resource ID)

**Request Headers:** `Content-Type: application/json`

**Payload Format:**
```json
{
  "resourceId": "1",
  "resourceName": "Meeting Room A Updated",
  "resourceDescription": "Updated description",
  "resourceAvailable": true,
  "resourcePrice": 60,
  "resourcePriceUnit": "hour"
}
```

**Mermaid Sequence Diagram:**

```mermaid
sequenceDiagram
    participant User as User (Browser)
    participant Frontend as Frontend<br/>(form.js, resources.js)
    participant Backend as Backend<br/>(Express Router)
    participant Validator as Validator Layer<br/>(resourceValidators)
    participant Service as Service Layer<br/>(log.service.js)
    participant DB as PostgreSQL

    User->>Frontend: Click "Update" button (form filled)
    Frontend->>Frontend: getPayloadFromForm()
    Frontend->>Backend: PUT /api/resources/:id<br/>{resourceName, resourceDescription, resourceAvailable, resourcePrice, resourcePriceUnit}

    alt ID Validation Fails
        Backend->>Backend: isNaN(id) check
        Backend->>Frontend: ✗ 400 Bad Request<br/>{ok: false, error: "Invalid ID"}
        Frontend->>User: ✗ Error message displayed
    else ID Validation Success
        alt Form Validation Fails
            Backend->>Validator: resourceValidators middleware
            Validator->>Validator: Check field constraints
            Validator->>Backend: ✗ Validation fails
            Backend->>Frontend: ✗ 400 Bad Request<br/>{ok: false, errors: [{field: "...", msg: "..."}]}
            Frontend->>User: ✗ Display field errors
        else Form Validation Success
            Backend->>Validator: resourceValidators middleware
            Validator->>Validator: Check field constraints
            Validator->>Backend: ✓ Validation passes
            
            Backend->>DB: UPDATE resources<br/>SET name=$1, description=$2, available=$3, price=$4, price_unit=$5<br/>WHERE id=$6<br/>RETURNING *
            
            alt Update Success (Resource Exists)
                DB->>Backend: ✓ rowCount=1, rows=[{...}]
                Backend->>Service: logEvent({message: "Resource updated (ID X)", entityId: X})
                Service->>DB: INSERT INTO logs
                DB->>Service: ✓ Logged
                Backend->>Frontend: ✓ 200 OK<br/>{ok: true, data: {...}}
                Frontend->>User: ✓ Success Message<br/>"Resource updated!"<br/>Clear form, reload list
            else Resource Not Found (rowCount=0)
                DB->>Backend: ✓ rows=[]
                Backend->>Frontend: ✗ 404 Not Found<br/>{ok: false, error: "Resource not found"}
                Frontend->>User: ✗ Error: "Resource no longer exists"
            else Duplicate Name Violation (Code 23505)
                DB->>Backend: ✗ Error code 23505 (unique constraint)
                Backend->>Frontend: ✗ 409 Conflict<br/>{ok: false, error: "Duplicate resource name"}
                Frontend->>User: ✗ Error: "Same name already exists"
            end
        end
    else Database Error
        Backend->>DB: UPDATE resources
        DB->>Backend: ✗ Unexpected database error
        Backend->>Frontend: ✗ 500 Server Error<br/>{ok: false, error: "Database error"}
        Frontend->>User: ✗ Generic error message
    end
```

---

## 5. DELETE (D) - DELETE /api/resources/:id

**Endpoint:** `DELETE /api/resources/:id`

**URL Parameters:** `id` (numeric resource ID)

**Request Body:** None

**Response Format (Success):**
```
Status: 204 No Content
Body: (empty)
```

**Response Format (Error):**
```json
{
  "ok": false,
  "error": "Resource not found"
}
```

**Mermaid Sequence Diagram:**

```mermaid
sequenceDiagram
    participant User as User (Browser)
    participant Frontend as Frontend<br/>(form.js, resources.js)
    participant Backend as Backend<br/>(Express Router)
    participant Service as Service Layer<br/>(log.service.js)
    participant DB as PostgreSQL

    User->>Frontend: Click "Delete" button
    Frontend->>Frontend: getPayloadFromForm() (ID only)
    Frontend->>Backend: DELETE /api/resources/:id<br/>(no body)

    alt ID Validation Fails
        Backend->>Backend: isNaN(id) check
        Backend->>Frontend: ✗ 400 Bad Request<br/>{ok: false, error: "Invalid ID"}
        Frontend->>User: ✗ Error message displayed
    else ID Validation Success
        Backend->>DB: DELETE FROM resources WHERE id = $1

        alt Delete Success (rowCount=1)
            DB->>Backend: ✓ rowCount=1
            Backend->>Service: logEvent({message: "Resource deleted (ID X)", entityId: X})
            Service->>DB: INSERT INTO logs
            DB->>Service: ✓ Logged
            Backend->>Frontend: ✓ 204 No Content<br/>(empty body)
            Frontend->>User: ✓ Success Message<br/>"Resource deleted!"<br/>Clear form, reload list
        else Resource Not Found (rowCount=0)
            DB->>Backend: ✓ rowCount=0 (no match)
            Backend->>Frontend: ✗ 404 Not Found<br/>{ok: false, error: "Resource not found"}
            Frontend->>User: ✗ Error: "Resource not found"
        end
    else Database Error
        Backend->>DB: DELETE FROM resources WHERE id = $1
        DB->>Backend: ✗ Unexpected database error
        Backend->>Frontend: ✗ 500 Server Error<br/>{ok: false, error: "Database error"}
        Frontend->>User: ✗ Generic error message
    end
```

---

## Key Data Flow Observations

### Status Codes Used
- **200 OK**: Successful GET or PUT request (resource returned in body)
- **201 Created**: Successful POST request (new resource returned in body)
- **204 No Content**: Successful DELETE request (no body returned)
- **400 Bad Request**: Validation fails or invalid ID format
- **404 Not Found**: Resource does not exist
- **409 Conflict**: Duplicate resource name (unique constraint violation, code 23505)
- **500 Server Error**: Unexpected database or server error

### Frontend Response Handling
- All successful operations trigger `window.onResourceActionSuccess()` callback
- Callback resets form to "create" mode and reloads the resource list
- Error responses display formatted messages with field-level details for 400 errors
- 204 responses are handled specially (no JSON body to parse)

### Validation Layer
- Both POST and PUT operations validate fields via `resourceValidators` middleware
- Fields validated: `resourceName`, `resourceDescription`, `resourceAvailable`, `resourcePrice`, `resourcePriceUnit`
- Validation errors return array of objects: `{field: "...", msg: "..."}`

### Logging
- All successful C, U, D operations log to database via `log.service.js`
- Duplicate resource blocking is also logged
- Logs include actor ID (currently null), message, entity type, and entity ID

### Database Constraints
- **Unique Constraint on `name`**: Duplicate names cause 409 Conflict (error code 23505)
- **Primary Key on `id`**: Enforced by PostgreSQL, ensures uniqueness
- **Ordering**: Resources displayed ordered by `created_at DESC` (newest first)

---

## Testing with Developer Tools

To verify this data flow:

1. **Open Browser Developer Tools** (F12)
2. **Go to Network tab**, filter by XHR/Fetch
3. **Perform each operation** (Create, Read, Update, Delete)
4. **Inspect each request:**
   - Request method and URL
   - Request body (JSON payload)
   - Response status code
   - Response body (JSON or empty)
5. **Check Console tab** for any client-side errors or logs

---

## File Structure Reference

```
Phase6/
├── public/
│   ├── form.js              # Form submission handler (C, U, D logic)
│   ├── resources.js         # Frontend state & list rendering (R logic)
│   ├── resources.html       # HTML structure
│   └── index.html           # Home page
├── src/
│   ├── routes/
│   │   └── resources.routes.js   # Express routes (all CRUD endpoints)
│   ├── services/
│   │   └── log.service.js        # Logging service
│   ├── validators/
│   │   └── resource.validators.js # Field validation middleware
│   ├── db/
│   │   └── pool.js               # Database connection pool
│   └── app.js
├── server.js
├── Dockerfile
├── docker-compose.yml
└── G1_CRUD_DataFlow.md (this file)
```

---

**Document Version:** 1.0  
**Phase:** Phase6  
**Operations Documented:** CREATE, READ (All & Single), UPDATE, DELETE
