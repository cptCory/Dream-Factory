attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aVertexTextureCoord;

uniform mat4 uMMatrix;
uniform mat4 uPMatrix;
uniform mat4 uVMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;
varying vec4 vTransformedNormal;
varying vec4 vPosition;


void main(void) {
	//vPosition =  uMMatrix * uVMatrix * vec4(aVertexPosition, 1.0);
	vPosition = uMMatrix * vec4(aVertexPosition, 1.0);
	//gl_Position = uPMatrix * vPosition;
	
	vTextureCoord = aVertexTextureCoord;
	vTransformedNormal = uMMatrix * vec4(aVertexNormal, 0.0);
	//vTransformedNormal = uNMatrix * vec4(aVertexNormal, 0.0);
	gl_Position = uPMatrix * uVMatrix * uMMatrix * vec4(aVertexPosition, 1.0);
}