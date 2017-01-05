  (function ()  {
    angular // declares app is an angular application
      .module("BlogApp", []) // see index.html ln 2, app must be declared
      .controller("BlogController", BlogController);

    function BlogController($scope, $http) {
      $scope.createPost = createPost;

      function init() {
        getAllPosts();
      }

      function getAllPosts() {
        $http
            .get("/api/blogpost");
            .success(function(posts)){
                $scope.posts = posts;
            })
      }

      function createPost(post) {
        console.log(post);
        $http.post("/api/blogpost", post);
      }
    }
})();
