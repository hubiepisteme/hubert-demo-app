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
     sh 'npm --no-git-tag-version version patch -m "Bumped to version %s"'
     //def ret = sh(script: 'uname', returnStdout: true)
     env.BUILD_VERSION_NUMBER = sh(script: 'python packageVersion.py', returnStdout: true).trim() + '-buildNr-' + BUILD_NUMBER
     dir ('build') {
         sh 'zip -r ../build-$BUILD_VERSION_NUMBER.zip *'
     }


     //withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'MyID', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD']]) {
          sh 'git log'
          sh 'git status'
          sh 'git push https://github.com/hubiepisteme/hubert-demo-app.git' HEAD:master package.json
     //}
   }

   stage ('attach artifacts to the build') {
      String  deployPackageName = 'build-' + BUILD_VERSION_NUMBER + '.zip'
	    echo 'Deploy package name: ' + deployPackageName
      archiveArtifacts artifacts: deployPackageName,
                       caseSensitive: false,
                       onlyIfSuccessful: true
   }

   stage ('clean workspace') {
      cleanWs deleteDir: true
	        patterns: [
            [pattern: 'node_modules', type: 'EXCLUDE']
	        ]
   }
}
