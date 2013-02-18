precision mediump float;

varying vec2 vTextureCoord;
varying vec4 vTransformedNormal;
varying vec4 vPosition;

uniform float uMaterialShininess;

uniform bool uShowSpecularHighlights;
uniform bool uUseLighting;
uniform bool uUseTextures;

uniform vec3 uAmbientColor;

uniform vec3 uPointLightingLocation;
uniform vec3 uPointLightingSpecularColor;
uniform vec3 uPointLightingDiffuseColor;

uniform sampler2D uDiffuseSampler;
uniform sampler2D uEmissiveSampler;


void main(void) {
	vec3 lightWeighting;
	if (!uUseLighting) {
		lightWeighting = vec3(1.0, 1.0, 1.0);
	} else {
		vec3 lightDirection = normalize(uPointLightingLocation - vPosition.xyz);
		vec3 normal = normalize(vTransformedNormal.xyz);
		//vec3 normal = vTransformedNormal.xyz;

		float specularLightWeighting = 0.0;
		if (uShowSpecularHighlights) {
			vec3 eyeDirection = normalize(-vPosition.xyz);
			vec3 reflectionDirection = reflect(-lightDirection, normal);

			specularLightWeighting = pow(max(dot(reflectionDirection, eyeDirection), 0.0), uMaterialShininess);
		}

		float diffuseLightWeighting = max(dot(normal, lightDirection), 0.0);
		lightWeighting = uAmbientColor;
		if (diffuseLightWeighting > 0.0) {
			lightWeighting += uPointLightingSpecularColor * specularLightWeighting
			+ uPointLightingDiffuseColor * diffuseLightWeighting;
		}
	}

	vec4 fragmentColor;
	vec4 emissive;
	if (uUseTextures) {
		fragmentColor = texture2D(uDiffuseSampler, vec2(vTextureCoord.s, vTextureCoord.t));
		emissive = texture2D(uEmissiveSampler, vTextureCoord);
	} else {
		fragmentColor = vec4(1.0, 1.0, 1.0, 1.0);
	}
	gl_FragColor = vec4(max(fragmentColor.rgb * lightWeighting, emissive.rgb), fragmentColor.a);
}