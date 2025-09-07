CREATE TABLE departamento (
	id_departamento VARCHAR(15) NOT NULL PRIMARY KEY,
	piso_departamento VARCHAR(15) NOT NULL,
	numero_departamento VARCHAR(15) NOT NULL,
	tipo_departamento VARCHAR(20) NOT NULL,
	fecha_actualizacion TIMESTAMP NOT NULL
)

CREATE TABLE residente (
	id_residente VARCHAR(20) NOT NULL PRIMARY KEY,
	nombre_residente VARCHAR(50) NOT NULL,
	paterno_residente VARCHAR(50) NOT NULL,
	materno_residente VARCHAR(50) NOT NULL,
	fecha_nacimiento DATE NOT NULL,
	correo_residente VARCHAR(100) NOT NULL,
	contacto_residente INT NOT NULL,
	clave_residente VARCHAR(100) NOT NULL,
	fecha_ingreso TIMESTAMP NOT NULL,
	fecha_actualizacion TIMESTAMP NOT NULL,
	id_departamento VARCHAR(15) NOT NULL
)

--Establecer llave foranea id_departamento en tabla residente 
ALTER TABLE residente 
ADD CONSTRAINT fk_residente_departamento
FOREIGN KEY (id_departamento)
REFERENCES departamento (id_departamento);

CREATE TABLE administrador (
	id_administrador VARCHAR(20) NOT NULL PRIMARY KEY,
	nombre_administrador VARCHAR(50) NOT NULL,
	paterno_administrador VARCHAR(50) NOT NULL,
	materno_administrador VARCHAR(50) NOT NULL,
	fecha_nacimiento DATE NOT NULL,
	correo_administrador VARCHAR(100) NOT NULL,
	contacto_administrador INT NOT NULL,
	clave_administrador VARCHAR(100) NOT NULL,
	fecha_ingreso TIMESTAMP NOT NULL,
	fecha_actualizacion TIMESTAMP NOT NULL
)