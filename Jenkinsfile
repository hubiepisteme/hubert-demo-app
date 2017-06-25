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
     //def ret = sh(script: 'uname', returnStdout: true)
     env.BUILD_VERSION_NUMBER = sh(script: 'python packageVersion.py', returnStdout: true).trim() + '.' + BUILD_NUMBER
     dir ('build') {
         sh 'zip -r ../build-$BUILD_VERSION_NUMBER.zip *'
     }
   }

   stage ('attach artifacts to the build') {
      String  deployPackageName = 'build-' + BUILD_VERSION_NUMBER + '.zip'
	    echo 'Deploy package name: ' + deployPackageName
      archiveArtifacts artifacts: deployPackageName,
                       caseSensitive: false,
                       onlyIfSuccessful: true
   }

   stage ('clean workspace') {
      cleanWs deleteDirs: true,
	        patterns: [
            [pattern: '**', type: 'INCLUDE'],
            [pattern: 'node_modules/**', type: 'EXCLUDE']
	        ]

   }
}
