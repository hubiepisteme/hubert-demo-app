node {
   stage ('checkout'){
       checkout scm
   }
   stage ('install dependences'){
      sh 'npm install'
   }
   
   stage ('test'){
      sh 'CI=1 npm test'
   }
   stage ('build'){
          sh 'npm run build'
   }

   stage ('zip build result'){
     sh 'cd build'
     sh 'ls -la'
     sh 'cd build; ls -la'
     env.JSON_PACKAGE_VERSION_NUMBER = '1.1.1'     
     dir ('build') {
         sh 'zip -r ../build-$JSON_PACKAGE_VERSION_NUMBER.zip *'     
     }
   }

   stage ('attach artifacts to the build') {
      archiveArtifacts artifacts: 'build-1.1.1.20.zip', 
                       caseSensitive: false, 
                       onlyIfSuccessful: true      
   }
   
   stage ('clean workspace') {
      cleanWs deleteDirs: true,
	 patterns: [
            [pattern: 'node_modules/*', type: 'EXCLUDE']
	 ]
      
   }
}
