#!/usr/bin/env groovy

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
     env.VERSION_NUMBER = sh 'python packageVersion.py' + '.' + BUILD_NUMBER
     dir ('build') {
         sh 'zip -r ../build-$VERSION_NUMBER.zip *'
     }
   }

   stage ('attach artifacts to the build') {
      String  deployPackageName = 'build-' + VERSION_NUMBER + '.zip'
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
