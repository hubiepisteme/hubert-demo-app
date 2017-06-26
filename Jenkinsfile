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
     echo 'npm --no-git-tag-version version patch'
     sh 'git branch -a; git checkout master; git branch -a; npm --no-git-tag-version version patch -m "Bump package version to %s."'

     env.PACKAGE_VERSION_NUMBER = sh(script: 'python packageVersion.py', returnStdout: true).trim();

     echo 'Push changes to GitHub: git push'
     // sh 'git commit -a -m "Bumped to version ${PACKAGE_VERSION_NUMBER}"'
     sh 'git branch -a; git status; git remote -v; git config remote.origin.url https://hubiepisteme:dcxevy12@github.com/hubiepisteme/hubert-demo-app.git; git remote -v; git push; git status'
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
