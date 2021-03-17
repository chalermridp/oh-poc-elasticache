create table product
(
	id serial not null primary key,
	name varchar(100) not null,
	description varchar(255) null,
	is_active boolean not null default true,
	created_by varchar(50) not null,
	created_at timestamp not null default current_timestamp,
	updated_by varchar(50) null,
	updated_at timestamp null
);