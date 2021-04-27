export interface IUser {
    ID?:number,
	UserName:string,        
	Password:string,        
	Nombre:string,          
	Apellido:string,        
	FechaNacimiento:string, 
	FechaRegistro?:string | Date,   
	Email:string            
	FotoPerfil:string,      
	Tipo:number            
	Membresia:number        
}