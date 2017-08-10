#!/usr/bin/env groovy

node {

   stage ('checkout'){
    checkout([
                      $class                           : 'GitSCM',
                      branches                         : scm.branches,
                      doGenerateSubmoduleConfigurations: scm.doGenerateSubmoduleConfigurations,
                      extensions                       : scm.extensions + [[$class: 'LocalBranch', localBranch: env.BRANCH_NAME]],
                      userRemoteConfigs                : scm.userRemoteConfigs
    ])
   }

   def commitMessage = sh returnStdout: true, script: 'git show -s --oneline --format=%s'

   if (commitMessage.startsWith("Increment version: ")) {
       echo "This was a release commit, skipping build...";
       if (currentBuild.rawBuild.previousBuild) {
           currentBuild.result = currentBuild.rawBuild.previousBuild.getResult().toString()
       }
       return;
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

   String deployPackageName

   stage ('zip build result'){
     env.PACKAGE_VERSION_NUMBER = sh(script: 'python packageVersion.py', returnStdout: true).trim();
     env.BUILD_VERSION_NUMBER = PACKAGE_VERSION_NUMBER + '-buildNr-' + BUILD_NUMBER

     if (env.BRANCH_NAME == "master") {
       sh 'npm version patch -m "Increment version: %s"'
       //sh 'git push --tags'
       sh 'git push origin HEAD:' + env.BRANCH_NAME
       deployPackageName = 'my-react-app-' + BUILD_VERSION_NUMBER + '.zip'
     }

     if (env.BRANCH_NAME == "develop") {
       env.GIT_HASH = (sh(returnStdout: true, script: 'git show -s --format=%h')).trim()
       deployPackageName = 'my-react-app-' + BUILD_VERSION_NUMBER + '.' +  env.GIT_HASH + '.zip'
     }

     if (deployPackageName) {
       dir('build') {
         sh 'zip -r ../' + deployPackageName + ' .'
       }
     }
   }

   stage ('attach artifacts to the build') {
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
