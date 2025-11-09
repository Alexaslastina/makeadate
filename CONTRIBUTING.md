# Contributing to Make a Date

Thank you for your interest in contributing to Make a Date! We welcome contributions from the community.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- A clear title and description
- Steps to reproduce the issue
- Expected vs actual behavior
- Your environment (OS, Node version, etc.)
- Screenshots if applicable

### Suggesting Features

We love new ideas! To suggest a feature:
- Open an issue with the label "enhancement"
- Describe the feature and its use case
- Explain why it would be valuable
- Include examples if possible

### Pull Requests

1. **Fork the Repository**
   ```bash
   git clone https://github.com/Alexaslastina/makeadate.git
   cd makeadate
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Follow the existing code style
   - Add tests if applicable
   - Update documentation as needed

4. **Test Your Changes**
   ```bash
   # Run frontend
   npm run start:frontend
   
   # Run backend
   npm run start:api
   
   # Test MongoDB connection
   npm run test:mongodb
   ```

5. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add amazing new feature"
   ```

   Follow conventional commit format:
   - `feat:` new feature
   - `fix:` bug fix
   - `docs:` documentation changes
   - `style:` code style changes
   - `refactor:` code refactoring
   - `test:` adding tests
   - `chore:` maintenance tasks

6. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then open a Pull Request on GitHub.

## Development Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Setup MongoDB**
   Follow [MONGODB_SETUP.md](MONGODB_SETUP.md)

3. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

4. **Start Development**
   ```bash
   # Terminal 1
   npm run start:api
   
   # Terminal 2
   npm run start:frontend
   ```

## Code Style

- Use TypeScript for all new code
- Follow existing naming conventions
- Add comments for complex logic
- Keep functions small and focused
- Use meaningful variable names

## Project Structure

```
makeadate/
├── apps/
│   ├── api/        # NestJS backend
│   └── frontend/   # React frontend
├── docs/           # Documentation
└── README.md       # Main documentation
```

## Testing

- Write tests for new features
- Ensure existing tests pass
- Test in multiple browsers
- Test responsive design

## Documentation

- Update README.md if needed
- Add JSDoc comments to functions
- Update relevant documentation files
- Include examples in your PR

## Questions?

- Check existing documentation
- Search existing issues
- Create a new issue with your question
- Join our community discussions

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Accept constructive criticism
- Focus on what's best for the project

## License

By contributing, you agree that your contributions will be licensed under the ISC License.

---

Thank you for contributing to Make a Date! 💕




