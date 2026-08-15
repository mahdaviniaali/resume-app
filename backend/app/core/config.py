from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    secret_key: str = "genesis-dev-secret-change-me"
    admin_username: str = "admin"
    admin_password: str = "admin123"
    database_url: str = "sqlite:///./genesis.db"
    cors_origins: str = "http://localhost:3000,http://127.0.0.1:3000"
    access_token_expire_minutes: int = 1440
    algorithm: str = "HS256"

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


settings = Settings()
