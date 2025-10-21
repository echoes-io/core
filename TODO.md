# TODO

## Planned Utilities

### Database Schema
- [ ] SQLite schema definition
  - Tables: `timelines`, `arcs`, `episodes`, `parts`, `chapters`
  - Relationships and foreign keys
  - Indexes for performance
- [ ] Migration system
- [ ] Query helpers and utilities

### TypeScript Models
- [ ] `Timeline` interface
- [ ] `Arc` interface
- [ ] `Episode` interface
- [ ] `Part` interface
- [ ] `Chapter` interface
- [ ] Validation schemas (Zod?)

### Markdown Parser
- [ ] Frontmatter YAML extraction
- [ ] Metadata parser (POV, title, date, etc.)
- [ ] Content body extraction
- [ ] Path convention utilities

### Validators
- [ ] Timeline consistency checker
- [ ] POV validation per timeline
- [ ] Episode/chapter ordering validation
- [ ] Required metadata validation

### Content Utilities
- [ ] Chapter file path resolver
- [ ] Content organization helpers
- [ ] Batch processing utilities

## Future Considerations

- [ ] Echoes detection/tracking (automatic or manual?)
- [ ] Export utilities (JSON, LaTeX, etc.)
- [ ] Content search/indexing
- [ ] Statistics aggregation across timelines
