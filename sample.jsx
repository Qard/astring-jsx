class Test {
  render() {
    return <div foo="bar" foo:bar={bux}>
        This is a test.
        <Test.Name.Foo />
        {foo.map(() => 'bar')}
      </div>;
  }
}
