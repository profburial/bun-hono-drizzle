CREATE TABLE IF NOT EXISTS "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1000 CACHE 1),
	"email" varchar(256) NOT NULL,
	"password" text NOT NULL,
	"first_name" varchar(256) NOT NULL,
	"last_name" varchar(256) NOT NULL,
	"created_at" time DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
