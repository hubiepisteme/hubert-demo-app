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
     env.JSON_PACKAGE_VERSION_NUMBER = sh 'python packageVersion.py'     
     dir ('build') {
         sh 'zip -r ../build-$JSON_PACKAGE_VERSION_NUMBER.zip *'     
     }
   }

   stage ('attach artifacts to the build') {
      String  deployPackageName = 'build-' + JSON_PACKAGE_VERSION_NUMBER + '.zip'
	echo deployPackageName
      archiveArtifacts artifacts: deployPackageName, 
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
