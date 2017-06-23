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
          
     dir ('build') {
         sh 'zip -r ../build.zip *'
     }
   }

   stage ('attach artifacts to the build') {
      archiveArtifacts artifacts: 'build.zip', 
                       caseSensitive: false, 
                       onlyIfSuccessful: true      
   }
   
   stage ('clean workspace') {
      cleanWs(
         patterns: [
            [pattern: 'node_modules/*', type: 'EXCLUDE']
	 ]
      )
   }
}
