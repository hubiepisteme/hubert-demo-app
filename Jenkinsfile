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

     sh 'npm --no-git-tag-version version patch'
     env.PACKAGE_VERSION_NUMBER = sh(script: 'python packageVersion.py', returnStdout: true).trim();
     sh 'git pull https://github.com/hubiepisteme/hubert-demo-app.git; git status; git checkout master; git status; git commit -a -m "Bumped to version ${PACKAGE_VERSION_NUMBER}"; git push https://github.com/hubiepisteme/hubert-demo-app.git; git status'
     //def ret = sh(script: 'uname', returnStdout: true)

     env.BUILD_VERSION_NUMBER = PACKAGE_VERSION_NUMBER + '-buildNr-' + BUILD_NUMBER
     //sh 'git status; git commit -m "Bump package version to ${BUILD_VERSION_NUMBER}"; git status; git push https://github.com/hubiepisteme/hubert-demo-app.git master'
     dir ('build') {
         sh 'zip -r ../build-$BUILD_VERSION_NUMBER.zip *'
     }


     //withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'MyID', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD']]) {
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
