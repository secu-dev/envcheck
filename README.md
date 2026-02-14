# envcheck

A small ClI that helps keeps your environment variables
clean and safe.

Most projects slowly collect broken `.env` files:
- Variables used in code but missing in `.env.example`
- Old keys still in `.env.example` but not used anymore
- Secrets accidentally committed


envcheck exists to keep things simple and honset

---

## Why this exists

I've seen too many projects where:

- `.env.example` is outdated
- Production fails because of a missing variable
- `.env` gets committed by mistake
- Nobody really knows which variables are actually used

This tool tries to solve that.

Nothing fancy.
Just Clarity.

---

## Current Features (v0.1)

- Compare used env variabels vs `.env.example`
- Detect:
    - Missing variables (used but not documented)
    - Unused variables (documented but never used)
- Clean diff logic with full test coverage

More coming soon.

---

### Usage (dev mode for now)

```bash
npm run dev
```
Tests:
```bash
npm test
```

