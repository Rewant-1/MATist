# Database connection - Prisma Python client use karta hai
# Neon PostgreSQL se connect hota hai

from prisma import Prisma

# Singleton pattern - ek hi connection reuse hota hai
_db: Prisma | None = None

def get_db() -> Prisma:
    # Database client return karta hai, lazy init ke saath
    global _db
    if _db is None:
        _db = Prisma()
        _db.connect()
    return _db

def close_db():
    # Cleanup ke liye - server shutdown pe call hota hai
    global _db
    if _db is not None:
        _db.disconnect()
        _db = None
