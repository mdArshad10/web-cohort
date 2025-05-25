import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$post")({
  component: RouteComponent,
});

function RouteComponent() {
  const { post } = Route.useParams();
  return (
    <>
      <div>Hello `Hello`</div>
      <h4>The Post id: {post}</h4>
    </>
  );
}
