import "./CreatePost.scss";
import { useForm } from "react-hook-form";

type FormFields = {
  title: string;
  category: string;
  description: string;
  image: FileList;
};

const CreatePost: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<FormFields>();

  function onSubmit(data: FormFields) {
    console.log(data);
  }

  return (
    <section className="section section__create-post">
      <h1 className="section__create-post__title">Create new post</h1>

      <form className="form section__create-post__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-controll">
          <label htmlFor="title">Post title:</label>

          <input
            {...register("title", {
              required: "Post title is required",
              minLength: {
                value: 3,
                message: "Title must be at least 3 characters",
              },
            })}
            id="title"
            placeholder="Post title"
            className={`section__create-post__input ${
              errors.title ? "input-error" : touchedFields.title ? "input-success" : ""
            }`}
          />

          {errors.title && (
            <small className="form-message form-message--error">{errors.title.message}</small>
          )}

          {!errors.title && touchedFields.title && (
            <small className="form-message form-message--success">Looks good</small>
          )}
        </div>

        <div className="form-controll">
          <label htmlFor="category">Post category:</label>

          <select
            {...register("category", {
              required: "Please choose a category",
            })}
            id="category"
            defaultValue=""
            className={`section__create-post__input ${
              errors.category ? "input-error" : touchedFields.category ? "input-success" : ""
            }`}
          >
            <option value="" hidden>
              Choose category
            </option>
            <option value="music">Music</option>
            <option value="coffee">Coffee</option>
          </select>

          {errors.category && (
            <small className="form-message form-message--error">{errors.category.message}</small>
          )}

          {!errors.category && touchedFields.category && (
            <small className="form-message form-message--success">Category selected 👍</small>
          )}
        </div>

        <div className="form-controll">
          <label htmlFor="description">Post description:</label>

          <textarea
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 10,
                message: "Description must be at least 10 characters",
              },
            })}
            id="description"
            rows={8}
            className={`section__create-post__input ${
              errors.description ? "input-error" : touchedFields.description ? "input-success" : ""
            }`}
          />

          {errors.description && (
            <small className="form-message form-message--error">{errors.description.message}</small>
          )}

          {!errors.description && touchedFields.description && (
            <small className="form-message form-message--success">Description looks good</small>
          )}
        </div>
        <div className="form-controll">
          <label htmlFor="image">Post cover image:</label>

          <input
            type="file"
            accept="image/*"
            {...register("image", {
              required: "Please upload a cover image",
              validate: (files) => files.length === 1 || "You must select one image",
            })}
            className={errors.image ? "input-error" : touchedFields.image ? "input-success" : ""}
          />

          {errors.image && (
            <small className="form-message form-message--error">{errors.image.message}</small>
          )}

          {!errors.image && touchedFields.image && (
            <small className="form-message form-message--success">
              Image selected successfully
            </small>
          )}
        </div>

        <div className="form-controll form-controll--actions">
          <button type="reset">Reset</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
